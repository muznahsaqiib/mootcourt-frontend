#!/usr/bin/env python3
"""
Run script for Moot Court Backend
"""
import uvicorn
import sys
import os

# Add the app directory to Python path
sys.path.insert(0, os.path.dirname(__file__))

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="127.0.0.1",
        port=8000,
        reload=True,
        log_level="info"
    )