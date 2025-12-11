import os
import cohere
from dotenv import load_dotenv
load_dotenv()

cohere_api_key = os.getenv("COHERE_API_KEY")
cohere_client = cohere.Client(cohere_api_key)

print("Testing Cohere chat API directly...")

try:
    # Create a message with the context and user query for the chat API
    message = "Based on the following context, answer the user's question.\n\nContext:\nArtificial intelligence is a wonderful field that involves machine learning and neural networks. It has applications in robotics, natural language processing, and computer vision. AI systems can perform tasks that typically require human intelligence, such as visual perception, speech recognition, and decision-making.\n\nQuestion:\nWhat is artificial intelligence?"

    response = cohere_client.chat(
        message=message,
        max_tokens=500,
        temperature=0.7
    )

    response_text = response.text
    print("+ Chat API call successful!")
    print(f"Response: {response_text[:100]}...")

except Exception as e:
    print(f"- Chat API call failed: {e}")
    import traceback
    traceback.print_exc()