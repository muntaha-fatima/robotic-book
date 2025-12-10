import asyncio
import logging
from typing import Dict, Any, List
from dataclasses import dataclass


@dataclass
class RobotAction:
    """Represents a single action for the robot"""
    action_type: str  # move, speak, grasp, etc.
    parameters: Dict[str, Any]
    description: str


class VoiceToActionConverter:
    """
    Converts voice commands to robot actions using LLM and NLP.
    This would integrate with the RAG system to understand complex commands.
    """
    
    def __init__(self, rag_client=None):
        self.rag_client = rag_client
        self.logger = logging.getLogger(__name__)
        
    async def convert_voice_command(self, voice_text: str) -> List[RobotAction]:
        """
        Convert voice command to sequence of robot actions.
        Example: "Please move to the kitchen and bring me a cup" 
        -> [move_to(location="kitchen"), find_object(object="cup"), grasp_object(object="cup"), return_to_user()]
        """
        self.logger.info(f"Processing voice command: {voice_text}")
        
        # This would use the RAG system to understand the command in context
        actions = await self._plan_actions(voice_text)
        
        return actions
        
    async def _plan_actions(self, command: str) -> List[RobotAction]:
        """
        Plan a sequence of actions based on the command.
        This would use the LLM to decompose the command into primitive actions.
        """
        # In a real implementation, this would call the RAG system or LLM
        # to decompose the command into a sequence of robot actions
        
        # For now, we'll implement some basic command parsing
        command_lower = command.lower()
        
        actions = []
        
        if "move" in command_lower or "go" in command_lower or "navigate" in command_lower:
            # Extract location if specified
            location = self._extract_location(command)
            if location:
                actions.append(RobotAction(
                    action_type="move_to",
                    parameters={"location": location},
                    description=f"Move to {location}"
                ))
        
        if "speak" in command_lower or "say" in command_lower:
            text_to_speak = self._extract_speech_text(command)
            if text_to_speak:
                actions.append(RobotAction(
                    action_type="speak",
                    parameters={"text": text_to_speak},
                    description=f"Speak: {text_to_speak}"
                ))
        
        if "bring" in command_lower or "get" in command_lower or "fetch" in command_lower:
            object_to_fetch = self._extract_object(command)
            if object_to_fetch:
                actions.append(RobotAction(
                    action_type="find_object",
                    parameters={"object": object_to_fetch},
                    description=f"Find {object_to_fetch}"
                ))
                actions.append(RobotAction(
                    action_type="grasp_object",
                    parameters={"object": object_to_fetch},
                    description=f"Grasp {object_to_fetch}"
                ))
                actions.append(RobotAction(
                    action_type="return_to_user",
                    parameters={},
                    description="Return to user"
                ))
        
        # If we couldn't parse a specific command, send to RAG/LLM for cognitive planning
        if not actions:
            actions = await self._use_llm_planning(command)
            
        return actions
        
    def _extract_location(self, command: str) -> str:
        """Extract location from command (simple implementation)"""
        # This is a simplified implementation - in reality, this would use NLP
        locations = ["kitchen", "bedroom", "living room", "office", "dining room", "bathroom"]
        for loc in locations:
            if loc in command.lower():
                return loc
        return "unknown location"
        
    def _extract_speech_text(self, command: str) -> str:
        """Extract text to speak from command (simple implementation)"""
        # Look for text in quotes or after "say" or "speak"
        if "say" in command.lower():
            parts = command.lower().split("say")
            if len(parts) > 1:
                return parts[1].strip().strip('"').strip("'")
        if "speak" in command.lower():
            parts = command.lower().split("speak")
            if len(parts) > 1:
                return parts[1].strip().strip('"').strip("'")
        return command
        
    def _extract_object(self, command: str) -> str:
        """Extract object from command (simple implementation)"""
        objects = ["cup", "book", "bottle", "phone", "keys", "ball"]
        for obj in objects:
            if obj in command.lower():
                return obj
        return "unknown object"
        
    async def _use_llm_planning(self, command: str) -> List[RobotAction]:
        """
        Use LLM/cognitive planning to decompose complex command into actions.
        This would connect to the RAG system for context-aware planning.
        """
        # In a real implementation, this would call the LLM through the RAG system
        # For now, return a single unknown action
        return [RobotAction(
            action_type="unknown_command",
            parameters={"command": command},
            description=f"Unknown command: {command}. Could not parse into actions."
        )]


# Example usage
async def main():
    # Initialize the voice-to-action converter
    # In reality, this would connect to your RAG system
    converter = VoiceToActionConverter()
    
    # Example commands
    commands = [
        "Please go to the kitchen",
        "Say hello world",
        "Can you bring me the cup?",
        "Navigate to the living room and speak 'I am here'"
    ]
    
    for cmd in commands:
        print(f"\nProcessing command: '{cmd}'")
        actions = await converter.convert_voice_command(cmd)
        for i, action in enumerate(actions):
            print(f"  {i+1}. {action.description}")


if __name__ == "__main__":
    asyncio.run(main())