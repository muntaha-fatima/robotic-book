import os
import psycopg2
from datetime import datetime, timedelta
from typing import Optional
from passlib.context import CryptContext
from fastapi import HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt
from database import get_db_connection
from psycopg2.extras import RealDictCursor
import logging

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Secret key for JWT
SECRET_KEY = os.environ.get("SECRET_KEY", "your-secret-key-change-this-in-production")
ALGORITHM = os.environ.get("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.environ.get("ACCESS_TOKEN_EXPIRE_MINUTES", 30))

security = HTTPBearer()

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a plain password against a hashed password."""
    try:
        # Ensure the password is truncated to the same length as during hashing for verification
        if len(plain_password.encode('utf-8')) > 72:
            plain_password = plain_password.encode('utf-8')[:72].decode('utf-8', errors='ignore')
        return pwd_context.verify(plain_password, hashed_password)
    except Exception:
        # On any error during verification, return False to prevent information disclosure
        return False

def get_password_hash(password: str) -> str:
    """Hash a password with bcrypt, truncating to 72 bytes if necessary."""
    # Truncate to 72 bytes if longer (bcrypt limit)
    if len(password.encode('utf-8')) > 72:
        # Take the first 72 bytes and decode back to string
        password = password.encode('utf-8')[:72].decode('utf-8', errors='ignore')
    try:
        return pwd_context.hash(password)
    except Exception as e:
        logging.error(f"Password hashing error: {e}")
        raise HTTPException(status_code=500, detail="Password hashing failed")

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """Create a JWT access token."""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire, "iat": datetime.utcnow()})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def get_user_by_username(username: str) -> Optional[dict]:
    """Get a user by username."""
    try:
        with get_db_connection() as conn:
            cur = conn.cursor(cursor_factory=RealDictCursor)
            cur.execute("SELECT id, username, password_hash FROM users WHERE username = %s", (username,))
            user = cur.fetchone()
            if user:
                return dict(user)
            return None
    except psycopg2.OperationalError as e:
        logging.error(f"Database connection error when getting user: {e}")
        raise HTTPException(status_code=500, detail="Database connection failed. Please check your database configuration.")
    except Exception as e:
        logging.error(f"Database error when getting user: {e}")
        return None

def authenticate_user(username: str, password: str) -> Optional[dict]:
    """Authenticate a user by username and password."""
    user = get_user_by_username(username)
    if not user:
        # To prevent timing attacks, we perform a dummy hash operation
        pwd_context.hash("dummy_password_for_timing_attack_prevention")
        return False
    if not verify_password(password, user["password_hash"]):
        return False
    return user

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> dict:
    """Get the current user from the JWT token."""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = get_user_by_username(username)
    if user is None:
        raise credentials_exception
    return user

async def signup_user(username: str, password: str):
    """Register a new user with proper validation."""
    # Validate password length (minimum 8 characters)
    if len(password) < 8:
        raise HTTPException(status_code=400, detail="Password must be at least 8 characters long")

    # Validate password length (byte-level check for bcrypt - max 72 bytes)
    if len(password.encode('utf-8')) > 72:
        raise HTTPException(status_code=400, detail="Password cannot exceed 72 bytes due to bcrypt limitations.")

    # Verify user doesn't already exist
    existing_user = get_user_by_username(username)
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already registered")

    # Hash password
    password_hash = get_password_hash(password)

    # Insert user into database
    try:
        with get_db_connection() as conn:
            cur = conn.cursor()
            try:
                cur.execute(
                    "INSERT INTO users (username, password_hash) VALUES (%s, %s) RETURNING id",
                    (username, password_hash)
                )
                user_id = cur.fetchone()[0]
                conn.commit()

                # Return user data with access token
                access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
                access_token = create_access_token(
                    data={"sub": username}, expires_delta=access_token_expires
                )

                return {
                    "access_token": access_token,
                    "token_type": "bearer",
                    "user": {"id": user_id, "username": username}
                }
            except psycopg2.IntegrityError:
                # Handle potential race condition where user was created in the meantime
                conn.rollback()
                raise HTTPException(status_code=400, detail="Username already registered")
            except Exception as e:
                conn.rollback()
                logging.error(f"Database error during signup: {e}")
                raise HTTPException(status_code=500, detail="Registration failed")
    except psycopg2.OperationalError as e:
        logging.error(f"Database connection error during signup: {e}")
        raise HTTPException(status_code=500, detail="Database connection failed. Please check your database configuration.")

async def login_user(username: str, password: str):
    """Login a user and return an access token."""
    user = authenticate_user(username, password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["username"]}, expires_delta=access_token_expires
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {"id": user["id"], "username": user["username"]}
    }