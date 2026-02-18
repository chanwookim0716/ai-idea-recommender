import React from 'react';
import { Button } from 'react-bootstrap';

interface SignupButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const SignupButton: React.FC<SignupButtonProps> = React.memo(({ onClick, disabled }) => {
  SignupButton.displayName = 'SignupButton';
  const buttonStyle: React.CSSProperties = {
    backgroundColor: '#4682B4', // Steel Blue background
    borderColor: '#4682B4', // Steel Blue border
    color: 'white', // White text
  };

  const hoverStyle: React.CSSProperties = {
    backgroundColor: '#3970A1', // Slightly darker Steel Blue on hover
    borderColor: '#3970A1', // Slightly darker Steel Blue border on hover
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
