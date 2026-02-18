import React from 'react';
import { Button } from 'react-bootstrap';

interface LoginButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const LoginButton: React.FC<LoginButtonProps> = React.memo(({ onClick, disabled }) => {
  LoginButton.displayName = 'LoginButton';
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      style={{ backgroundColor: '#87CEEB', borderColor: '#87CEEB', color: 'white' }}
    >
      로그인
    </Button>
  );
});

export default LoginButton;
