from pymongo import MongoClient
from pymongo.database import Database

# MongoDB connection
client = MongoClient("mongodb://localhost:27017")
db = client.moot_court_db

def init_db():
    """Initialize database connection"""
    try:
        # Test connection
        db.command('ping')
        print("Connected to MongoDB")
    except Exception as e:
        print(f"MongoDB connection failed: {e}")
        # For development, create a mock db if MongoDB is not available
        global db
        db = MockDatabase()

class MockDatabase:
    """Mock database for development when MongoDB is not available"""
    def __init__(self):
        self.sessions = MockCollection()

class MockCollection:
    """Mock collection for development"""
    def __init__(self):
        self.data = []

    def insert_one(self, doc):
        doc['_id'] = str(len(self.data) + 1)
        self.data.append(doc)
        return MockResult(doc['_id'])

    def update_one(self, filter_doc, update_doc):
        # Mock update - do nothing
        pass

class MockResult:
    def __init__(self, inserted_id):
        self.inserted_id = inserted_id