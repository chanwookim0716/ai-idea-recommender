import React from 'react';
import { Button } from 'react-bootstrap';

interface SignupButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const SignupButton: React.FC<SignupButtonProps> = React.memo(({ onClick, disabled }) => {
  SignupButton.displayName = 'SignupButton';
  // Default style (filled)
  const defaultStyle: React.CSSProperties = {
    backgroundColor: '#4EA5F4', // New Sky Blue background
    borderColor: '#4EA5F4', // New Sky Blue border
    color: 'white', // White text
  };

  // Hover style (border only)
  const hoverStyle: React.CSSProperties = {
    backgroundColor: 'transparent',
    borderColor: '#4EA5F4', // New Sky Blue border
    color: '#4EA5F4', // New Sky Blue text
  };

  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      style={{ ...(isHovered ? hoverStyle : defaultStyle) }} // Apply hover style when hovered, otherwise default
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      회원가입
    </Button>
  );
});

export default SignupButton;
