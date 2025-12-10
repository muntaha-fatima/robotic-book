from typing import Any, Dict, List
import rclpy
from rclpy.node import Node
from std_msgs.msg import String
from geometry_msgs.msg import Twist, Pose
from builtin_interfaces.msg import Time


class HumanoidController(Node):
    """
    ROS 2 node to control humanoid robot movements.
    This node would connect to agent outputs from our RAG system.
    """
    
    def __init__(self):
        super().__init__('humanoid_controller')
        
        # Publishers for different robot actions
        self.cmd_vel_publisher = self.create_publisher(Twist, 'cmd_vel', 10)
        self.action_publisher = self.create_publisher(String, 'robot_actions', 10)
        
        # Subscribers for sensor data
        self.sensor_subscription = self.create_subscription(
            String,
            'sensor_data',
            self.sensor_callback,
            10
        )
        
        self.get_logger().info('Humanoid Controller node initialized')
        
    def sensor_callback(self, msg: String):
        """Handle incoming sensor data"""
        self.get_logger().info(f'Received sensor data: {msg.data}')
        
    def execute_action(self, action: str, params: Dict[str, Any] = None):
        """Execute a specific action on the humanoid robot"""
        if action == "move_forward":
            self.move_forward(params.get("distance", 1.0))
        elif action == "turn":
            self.turn(params.get("angle", 90.0))
        elif action == "speak":
            self.speak(params.get("text", ""))
        # Add more actions as needed
        
    def move_forward(self, distance: float):
        """Move the robot forward by specified distance"""
        msg = Twist()
        msg.linear.x = 0.5  # Set linear velocity
        self.cmd_vel_publisher.publish(msg)
        self.get_logger().info(f'Moving forward by {distance} meters')
        
    def turn(self, angle: float):
        """Turn the robot by specified angle"""
        msg = Twist()
        msg.angular.z = 0.5  # Set angular velocity
        self.cmd_vel_publisher.publish(msg)
        self.get_logger().info(f'Turning by {angle} degrees')
        
    def speak(self, text: str):
        """Make the robot speak text"""
        msg = String()
        msg.data = f"SPEAK:{text}"
        self.action_publisher.publish(msg)
        self.get_logger().info(f'Speaking: {text}')


def main(args=None):
    rclpy.init(args=args)
    
    humanoid_controller = HumanoidController()
    
    try:
        rclpy.spin(humanoid_controller)
    except KeyboardInterrupt:
        pass
    finally:
        humanoid_controller.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()