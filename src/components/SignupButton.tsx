import React from 'react';
import { Button } from 'react-bootstrap';

interface SignupButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const SignupButton: React.FC<SignupButtonProps> = React.memo(({ onClick, disabled }) => {
  SignupButton.displayName = 'SignupButton';
  const buttonStyle: React.CSSProperties = {
    backgroundColor: '#87CEEB', // Sky blue background
    borderColor: '#87CEEB', // Sky blue border
    color: 'white', // White text
  };

  const hoverStyle: React.CSSProperties = {
    backgroundColor: '#6AA8E0', // Slightly darker sky blue on hover
    borderColor: '#6AA8E0', // Slightly darker sky blue border on hover
  };

  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      style={{ ...buttonStyle, ...(isHovered ? hoverStyle : {}) }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      회원가입
    </Button>
  );
});

export default SignupButton;
