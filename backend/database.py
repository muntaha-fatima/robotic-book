import os
import psycopg2
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv
from contextlib import contextmanager

load_dotenv()

# Use Neon Postgres
NEON_DB_URL = os.getenv("NEON_DB_URL")

if not NEON_DB_URL:
    print("ERROR: NEON_DB_URL environment variable is not set!")
    print("Please set your Neon Postgres connection string in the .env file.")
    print("Example format: postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/dbname?sslmode=require")
else:
    print("NEON_DB_URL loaded successfully")

@contextmanager
def get_db_connection():
    try:
        conn = psycopg2.connect(NEON_DB_URL)
        yield conn
    except psycopg2.OperationalError as e:
        print(f"Database connection error: {e}")
        raise
    except Exception as e:
        print(f"Unexpected database error: {e}")
        raise
    finally:
        try:
            conn.close()
        except:
            pass

def create_users_table():
    try:
        conn = psycopg2.connect(NEON_DB_URL)
        cur = conn.cursor()
        cur.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                password_hash TEXT NOT NULL,
                profile JSONB DEFAULT '{}'  -- JSONB for PostgreSQL
            );
        """)
        conn.commit()
        cur.close()
        conn.close()
        print("Users table created successfully in Neon Postgres")
    except psycopg2.OperationalError as e:
        print(f"Error connecting to Neon Postgres: {e}")
        print("Please verify your NEON_DB_URL connection string is correct")
        print("Check username, password, host, database name, and SSL settings")
    except Exception as e:
        print(f"Error creating users table in Neon Postgres: {e}")

# Only initialize the table in the startup event, not at import time
# Initialize the table
# create_users_table()