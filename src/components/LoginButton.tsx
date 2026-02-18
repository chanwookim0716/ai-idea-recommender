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
    borderColor: '#4EA5F4', // New Sky Blue border
    color: '#4EA5F4', // New Sky Blue text
  };

  const hoverStyle: React.CSSProperties = {
    backgroundColor: '#4EA5F4', // New Sky Blue background on hover
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
