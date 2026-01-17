from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import moot_court, auth
from app.database.mongodb import init_db

app = FastAPI(title="Moot Court API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],  # Next.js dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(moot_court.router)
app.include_router(auth.router)

@app.on_event("startup")
async def startup_event():
    init_db()

@app.get("/")
async def root():
    return {"message": "Moot Court API"}

@app.get("/health")
async def health():
    return {"status": "healthy"}