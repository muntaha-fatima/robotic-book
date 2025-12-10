import React from 'react';

interface RoboticsIconProps {
  type: 'robot' | 'ai' | 'circuit' | 'humanoid';
  size?: number;
  color?: string;
}

const RoboticsIcon: React.FC<RoboticsIconProps> = ({ type, size = 24, color = 'currentColor' }) => {
  const iconPaths = {
    robot: (
      <svg 
        viewBox="0 0 24 24" 
        width={size} 
        height={size} 
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V7H21ZM21 9H3V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V9ZM7 15H9V17H7V15ZM11 15H13V17H11V15ZM15 15H17V17H15V15Z"/>
      </svg>
    ),
    ai: (
      <svg 
        viewBox="0 0 24 24" 
        width={size} 
        height={size} 
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM12 15.5C9.5 15.5 7.5 13.5 7.5 11S9.5 6.5 12 6.5S16.5 8.5 16.5 11S14.5 15.5 12 15.5ZM12 8.5C10.6 8.5 9.5 9.6 9.5 11S10.6 13.5 12 13.5S14.5 12.4 14.5 11S13.4 8.5 12 8.5ZM18 17H17.5C16.8 18.2 15.5 19 14 19S11.2 18.2 10.5 17H6V15H18V17Z"/>
      </svg>
    ),
    circuit: (
      <svg 
        viewBox="0 0 24 24" 
        width={size} 
        height={size} 
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V7H21ZM21 9H3V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V9ZM7 15H9V17H7V15ZM11 15H13V17H11V15ZM15 15H17V17H15V15Z"/>
      </svg>
    ),
    humanoid: (
      <svg 
        viewBox="0 0 24 24" 
        width={size} 
        height={size} 
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 12C14.21 12 16 10.21 16 8S14.21 4 12 4 8 5.79 8 8 9.79 12 12 12ZM6 22C6 17.58 9.58 14 14 14S22 17.58 22 22H6ZM12 10C10.9 10 10 9.1 10 8S10.9 6 12 6 14 6.9 14 8 13.1 10 12 10ZM14 20H18V18H14V20ZM14 16H20V14H14V16Z"/>
      </svg>
    )
  };

  return iconPaths[type];
};

export default RoboticsIcon;