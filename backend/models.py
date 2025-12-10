from pydantic import BaseModel
from typing import List, Optional

class SignUpRequest(BaseModel):
    username: str
    password: str

class LoginRequest(BaseModel):
    username: str
    password: str

class UpsertRequest(BaseModel):
    text: str

class RagQueryRequest(BaseModel):
    query: str

class ChatRequest(BaseModel):
    query: str

class Source(BaseModel):
    text: str
    score: float

class RagResponse(BaseModel):
    query: str
    context: str
    sources: List[Source]