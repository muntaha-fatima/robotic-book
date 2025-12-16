from pydantic import BaseModel
from typing import List, Optional, Dict, Any

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

class URLUpsertRequest(BaseModel):
    url: str
    chunk_size: int = 500
    chunk_overlap: int = 50

class DocumentUpsertRequest(BaseModel):
    content: str
    source_type: str = "document"  # "document", "url", "text"
    source_url: Optional[str] = None
    chunk_size: int = 500
    chunk_overlap: int = 50

class Source(BaseModel):
    text: str
    score: float
    metadata: Optional[Dict[str, Any]] = {}

class RagResponse(BaseModel):
    query: str
    context: str
    sources: List[Source]