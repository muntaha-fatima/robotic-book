#!/usr/bin/env python
"""
Simple server starter script
"""
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Change to the backend directory
os.chdir(os.path.dirname(os.path.abspath(__file__)))

try:
    from main import app
    import uvicorn
    print("Server starting on http://127.0.0.1:8000...")
    print("Press Ctrl+C to stop the server")
    uvicorn.run(app, host="127.0.0.1", port=8000)
except Exception as e:
    print(f"Error starting server: {e}")
    import traceback
    traceback.print_exc()