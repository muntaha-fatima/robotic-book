import os
import sys
import time
from main import app
import uvicorn

if __name__ == "__main__":
    print("Starting backend server on http://127.0.0.1:8001")
    print("Server is now running. Press Ctrl+C to stop.")
    uvicorn.run(
        app,
        host="127.0.0.1",
        port=8001,
        log_level="info"
    )