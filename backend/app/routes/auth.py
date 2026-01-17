from fastapi import APIRouter, HTTPException, Cookie
from typing import Optional

router = APIRouter(prefix="/auth", tags=["auth"])

@router.get("/me")
async def get_current_user(session_id: Optional[str] = Cookie(None)):
    """
    Get current user info based on session cookie.
    For development, return mock user if session exists.
    """
    if not session_id:
        raise HTTPException(status_code=401, detail="Not authenticated")

    # Mock user for development
    return {
        "id": "user_123",
        "email": "user@example.com",
        "name": "Test User",
        "role": "student"
    }