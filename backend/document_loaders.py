import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import PyPDF2
from io import BytesIO
import docx
import re
from typing import List, Dict, Any, Optional
import html2text


class DocumentLoader:
    """
    A utility class to load documents from various sources including URLs and files
    """
    
    @staticmethod
    def extract_text_from_html(html_content: str, url: str = None) -> str:
        """Extract text from HTML content"""
        soup = BeautifulSoup(html_content, 'html.parser')
        
        # Remove script and style elements
        for script in soup(["script", "style"]):
            script.decompose()
            
        # Get text and clean it up
        text = soup.get_text()
        
        # Clean up the text
        lines = (line.strip() for line in text.splitlines())
        chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
        text = ' '.join(chunk for chunk in chunks if chunk)
        
        return text

    @staticmethod
    def load_from_url(url: str) -> str:
        """Load content from a URL"""
        try:
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
            response = requests.get(url, headers=headers, timeout=30)
            response.raise_for_status()
            
            # Check content type to determine parsing method
            content_type = response.headers.get('content-type', '').lower()
            
            if 'application/pdf' in content_type:
                return DocumentLoader._extract_text_from_pdf_bytes(response.content)
            elif 'text/html' in content_type:
                return DocumentLoader.extract_text_from_html(response.text, url)
            else:
                # For other text-based content types, try to extract text
                return DocumentLoader.extract_text_from_html(response.text, url)
                
        except requests.RequestException as e:
            raise Exception(f"Failed to load URL {url}: {str(e)}")
        except Exception as e:
            raise Exception(f"Error processing content from URL {url}: {str(e)}")

    @staticmethod
    def _extract_text_from_pdf_bytes(pdf_bytes: bytes) -> str:
        """Extract text from PDF bytes"""
        try:
            pdf_file = BytesIO(pdf_bytes)
            pdf_reader = PyPDF2.PdfReader(pdf_file)
            text = ""
            for page in pdf_reader.pages:
                text += page.extract_text() + "\n"
            return text
        except Exception as e:
            raise Exception(f"Error extracting text from PDF: {str(e)}")

    @staticmethod
    def load_from_pdf_file(file_path: str) -> str:
        """Load content from a local PDF file"""
        try:
            with open(file_path, 'rb') as file:
                pdf_reader = PyPDF2.PdfReader(file)
                text = ""
                for page in pdf_reader.pages:
                    text += page.extract_text() + "\n"
            return text
        except Exception as e:
            raise Exception(f"Error loading PDF file {file_path}: {str(e)}")

    @staticmethod
    def load_from_docx_file(file_path: str) -> str:
        """Load content from a DOCX file"""
        try:
            doc = docx.Document(file_path)
            paragraphs = [p.text for p in doc.paragraphs if p.text]
            return "\n".join(paragraphs)
        except Exception as e:
            raise Exception(f"Error loading DOCX file {file_path}: {str(e)}")

    @staticmethod
    def load_from_txt_file(file_path: str) -> str:
        """Load content from a TXT file"""
        try:
            with open(file_path, 'r', encoding='utf-8') as file:
                return file.read()
        except Exception as e:
            raise Exception(f"Error loading TXT file {file_path}: {str(e)}")

    @staticmethod
    def chunk_text(text: str, chunk_size: int = 500, chunk_overlap: int = 50) -> List[str]:
        """Split text into overlapping chunks"""
        if not text:
            return []
            
        chunks = []
        start = 0
        
        while start < len(text):
            end = start + chunk_size
            
            # If we're near the end, take the remaining text
            if end >= len(text):
                chunks.append(text[start:])
                break
                
            # Find a good breaking point (whitespace) to avoid cutting words
            # Look backwards to find a space
            chunk = text[start:end]
            if end < len(text) and text[end] != ' ':
                # Find the last space in the current chunk to break cleanly
                last_space_idx = chunk.rfind(' ')
                if last_space_idx != -1:
                    end = start + last_space_idx
                    chunk = text[start:end]
                    
            chunks.append(text[start:end])
            
            # Move start position forward, considering overlap
            start = end - chunk_overlap if chunk_overlap < end else end
            
            # If start >= len(text), we're done
            if start >= len(text):
                break
                
        # Filter out empty chunks
        chunks = [chunk.strip() for chunk in chunks if chunk.strip()]
        
        return chunks