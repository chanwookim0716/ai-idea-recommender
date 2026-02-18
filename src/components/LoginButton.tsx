import React from 'react';
import { Button } from 'react-bootstrap';

interface LoginButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const LoginButton: React.FC<LoginButtonProps> = React.memo(({ onClick, disabled }) => {
  LoginButton.displayName = 'LoginButton';
  const buttonStyle: React.CSSProperties = {
    backgroundColor: 'transparent',
    borderColor: '#87CEEB', // Sky blue border
    color: '#87CEEB', // Sky blue text
  };

  const hoverStyle: React.CSSProperties = {
    backgroundColor: '#87CEEB', // Sky blue background on hover
    color: 'white', // White text on hover
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
      로그인
    </Button>
  );
});

export default LoginButton;
