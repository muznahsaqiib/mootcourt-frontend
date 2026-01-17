from typing import Dict, List, Any
from datetime import datetime

class TurnManager:
    def __init__(self, max_rounds: int = 2):
        self.max_rounds = max_rounds
        self.current_round = 1
        self.turn_sequence = [
            "petitioner_argument",
            "judge_questions_petitioner",
            "petitioner_response",
            "respondent_rebuttal",
            "judge_questions_respondent",
            "respondent_response",
            "concluded"
        ]
        self.current_turn_index = 0

    def current_turn(self) -> str:
        if self.current_turn_index >= len(self.turn_sequence):
            return "concluded"
        return self.turn_sequence[self.current_turn_index]

    def next_turn(self) -> str:
        self.current_turn_index += 1
        return self.current_turn()

    def is_concluded(self) -> bool:
        return self.current_turn() == "concluded"

class MootOrchestrator:
    def __init__(self, case_id: str, session_id: str, max_rounds: int = 2):
        self.case_id = case_id
        self.session_id = session_id
        self.max_rounds = max_rounds
        self.turn_manager = TurnManager(max_rounds)
        self.transcript: List[Dict[str, Any]] = []
        self.judge_questions: Dict[str, List[str]] = {
            "petitioner": [],
            "respondent": []
        }

    def get_session_state(self) -> Dict[str, Any]:
        return {
            "session_id": self.session_id,
            "case_id": self.case_id,
            "current_turn": self.turn_manager.current_turn(),
            "current_round": self.turn_manager.current_round,
            "awaiting_from": self._get_awaiting_party(),
            "transcript": self.transcript
        }

    def get_session_transcript(self) -> List[Dict[str, Any]]:
        return self.transcript

    def _get_awaiting_party(self) -> str:
        turn = self.turn_manager.current_turn()
        if "petitioner" in turn:
            return "petitioner"
        elif "respondent" in turn:
            return "respondent"
        return "none"

    def _add_to_transcript(self, speaker: str, content: str, type: str = "argument"):
        self.transcript.append({
            "timestamp": datetime.now().isoformat(),
            "speaker": speaker,
            "type": type,
            "content": content
        })

    def process_petitioner_argument(self, argument: str) -> Dict[str, Any]:
        if self.turn_manager.current_turn() != "petitioner_argument":
            return {"error": "Not petitioner's turn to argue"}

        self._add_to_transcript("petitioner", argument, "argument")
        next_turn = self.turn_manager.next_turn()

        return {
            "status": "argument_received",
            "next_turn": next_turn,
            "awaiting_from": self._get_awaiting_party()
        }

    def process_petitioner_response(self, response: str) -> Dict[str, Any]:
        if self.turn_manager.current_turn() != "petitioner_response":
            return {"error": "Not petitioner's turn to respond"}

        self._add_to_transcript("petitioner", response, "response")
        next_turn = self.turn_manager.next_turn()

        return {
            "status": "response_received",
            "next_turn": next_turn,
            "awaiting_from": self._get_awaiting_party()
        }

    def process_respondent_rebuttal(self, argument: str) -> Dict[str, Any]:
        if self.turn_manager.current_turn() != "respondent_rebuttal":
            return {"error": "Not respondent's turn to rebut"}

        # If no argument provided, generate AI response (placeholder)
        if not argument.strip():
            argument = "As respondent, we argue that the petitioner's claims lack merit..."

        self._add_to_transcript("respondent", argument, "rebuttal")
        next_turn = self.turn_manager.next_turn()

        return {
            "status": "rebuttal_received",
            "next_turn": next_turn,
            "awaiting_from": self._get_awaiting_party()
        }

    def process_respondent_response(self, response: str) -> Dict[str, Any]:
        if self.turn_manager.current_turn() != "respondent_response":
            return {"error": "Not respondent's turn to respond"}

        self._add_to_transcript("respondent", response, "response")
        next_turn = self.turn_manager.next_turn()

        return {
            "status": "response_received",
            "next_turn": next_turn,
            "awaiting_from": self._get_awaiting_party()
        }

    def process_judge_questions_petitioner(self) -> Dict[str, Any]:
        if self.turn_manager.current_turn() != "judge_questions_petitioner":
            return {"error": "Not time for judge questions to petitioner"}

        # Generate sample questions
        questions = [
            "Can you clarify the legal basis for your argument?",
            "How does this relate to the precedent case law?",
            "What remedy are you seeking?"
        ]

        self.judge_questions["petitioner"] = questions
        next_turn = self.turn_manager.next_turn()

        return {
            "status": "questions_generated",
            "questions": questions,
            "next_turn": next_turn,
            "awaiting_from": self._get_awaiting_party()
        }

    def process_judge_questions_respondent(self) -> Dict[str, Any]:
        if self.turn_manager.current_turn() != "judge_questions_respondent":
            return {"error": "Not time for judge questions to respondent"}

        # Generate sample questions
        questions = [
            "How do you respond to the petitioner's main argument?",
            "What counter-precedents apply here?",
            "Should this case be dismissed?"
        ]

        self.judge_questions["respondent"] = questions
        next_turn = self.turn_manager.next_turn()

        return {
            "status": "questions_generated",
            "questions": questions,
            "next_turn": next_turn,
            "awaiting_from": self._get_awaiting_party()
        }

    def conclude_moot(self) -> Dict[str, Any]:
        if not self.turn_manager.is_concluded():
            return {"error": "Moot is not ready to conclude"}

        self._add_to_transcript("judge", "Court is now in recess. Decision pending.", "conclusion")

        return {
            "status": "moot_concluded",
            "transcript": self.transcript,
            "final_turn": "concluded"
        }