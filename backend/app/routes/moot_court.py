from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from app.judge.moot_orchestrator import MootOrchestrator
from app.models.session import Session
from app.database.mongodb import db

router = APIRouter(prefix="/moot", tags=["moot-court"])

# In-memory storage for active orchestrators (in production, use Redis)
active_moots: Dict[str, MootOrchestrator] = {}

class ArgumentRequest(BaseModel):
    argument: str

class ResponseRequest(BaseModel):
    response: str

class InitiateMootRequest(BaseModel):
    case_id: str
    max_rounds: int = 2

# ==================== Session Management ====================

@router.post("/initiate")
async def initiate_moot(req: InitiateMootRequest) -> Dict[str, Any]:
    """
    Initiate a new moot court session.
    """
    try:
        # Create session in DB
        session_data = {
            "case_id": req.case_id,
            "status": "active",
            "rounds": req.max_rounds,
            "created_at": "2026-01-15"
        }
        session = Session(**session_data)
        result = db.sessions.insert_one(session.dict())
        session_id = str(result.inserted_id)

        # Create orchestrator
        orchestrator = MootOrchestrator(
            case_id=req.case_id,
            session_id=session_id,
            max_rounds=req.max_rounds
        )
        active_moots[session_id] = orchestrator

        return {
            "status": "moot_initiated",
            "session_id": session_id,
            "case_id": req.case_id,
            "next_turn": orchestrator.turn_manager.current_turn(),
            "awaiting_from": "petitioner"
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/status/{session_id}")
async def get_status(session_id: str) -> Dict[str, Any]:
    """Get current moot status"""
    if session_id not in active_moots:
        raise HTTPException(status_code=404, detail="Session not found")

    orchestrator = active_moots[session_id]
    return orchestrator.get_session_state()

@router.get("/transcript/{session_id}")
async def get_transcript(session_id: str) -> List[Dict[str, Any]]:
    """Get full session transcript"""
    if session_id not in active_moots:
        raise HTTPException(status_code=404, detail="Session not found")

    return active_moots[session_id].get_session_transcript()

# ==================== Petitioner Submissions ====================

@router.post("/petitioner/argument/{session_id}")
async def submit_petitioner_argument(session_id: str, req: ArgumentRequest) -> Dict[str, Any]:
    """
    Submit petitioner's opening argument.
    """
    if session_id not in active_moots:
        raise HTTPException(status_code=404, detail="Session not found")

    orchestrator = active_moots[session_id]
    result = orchestrator.process_petitioner_argument(req.argument)

    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])

    return result

@router.post("/petitioner/response/{session_id}")
async def submit_petitioner_response(session_id: str, req: ResponseRequest) -> Dict[str, Any]:
    """
    Submit petitioner's response to judge questions.
    """
    if session_id not in active_moots:
        raise HTTPException(status_code=404, detail="Session not found")

    orchestrator = active_moots[session_id]
    result = orchestrator.process_petitioner_response(req.response)

    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])

    return result

# ==================== Respondent Submissions ====================

@router.post("/respondent/rebuttal/{session_id}")
async def submit_respondent_rebuttal(session_id: str, req: ArgumentRequest) -> Dict[str, Any]:
    """
    Submit respondent's rebuttal (can be AI-generated if empty).
    """
    if session_id not in active_moots:
        raise HTTPException(status_code=404, detail="Session not found")

    orchestrator = active_moots[session_id]
    result = orchestrator.process_respondent_rebuttal(req.argument)

    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])

    return result

@router.post("/respondent/response/{session_id}")
async def submit_respondent_response(session_id: str, req: ResponseRequest) -> Dict[str, Any]:
    """
    Submit respondent's response to judge questions.
    """
    if session_id not in active_moots:
        raise HTTPException(status_code=404, detail="Session not found")

    orchestrator = active_moots[session_id]
    result = orchestrator.process_respondent_response(req.response)

    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])

    return result

# ==================== Judge Questions ====================

@router.get("/judge/questions/{session_id}")
async def get_judge_questions(session_id: str) -> Dict[str, Any]:
    """
    Generate judge's questions for current party.
    Automatically determines if it's petitioner or respondent turn.
    """
    if session_id not in active_moots:
        raise HTTPException(status_code=404, detail="Session not found")

    orchestrator = active_moots[session_id]
    current_turn = orchestrator.turn_manager.current_turn()

    if current_turn == "judge_questions_petitioner":
        result = orchestrator.process_judge_questions_petitioner()
    elif current_turn == "judge_questions_respondent":
        result = orchestrator.process_judge_questions_respondent()
    else:
        raise HTTPException(status_code=400, detail=f"Not a question phase. Current: {current_turn}")

    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])

    return result

# ==================== Conclude ====================

@router.post("/conclude/{session_id}")
async def conclude_moot(session_id: str) -> Dict[str, Any]:
    """
    Conclude moot court session and save to DB.
    """
    if session_id not in active_moots:
        raise HTTPException(status_code=404, detail="Session not found")

    orchestrator = active_moots[session_id]
    result = orchestrator.conclude_moot()

    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])

    # Save transcript to DB
    try:
        db.sessions.update_one(
            {"_id": session_id},
            {"$set": {
                "status": "completed",
                "transcript": orchestrator.get_session_transcript()
            }}
        )
    except:
        pass  # Log but don't fail

    # Remove from active
    del active_moots[session_id]

    return result