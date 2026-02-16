import React from 'react';
import { Button } from 'react-bootstrap';

interface LoginButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const LoginButton: React.FC<LoginButtonProps> = ({ onClick, disabled }) => {
  return (
    <Button variant="outline-primary" onClick={onClick} disabled={disabled} className="login-button-custom">
      로그인
    </Button>
  );
};

export default LoginButton;
