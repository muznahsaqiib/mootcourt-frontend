from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime

class Session(BaseModel):
    case_id: str
    status: str = "active"
    rounds: int = 2
    created_at: str
    transcript: Optional[List[Dict[str, Any]]] = None