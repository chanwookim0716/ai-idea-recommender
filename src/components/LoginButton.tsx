import React from 'react';
import { Button } from 'react-bootstrap';

interface LoginButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const LoginButton: React.FC<LoginButtonProps> = ({ onClick, disabled }) => {
  return (
    <Button variant="outline-primary" onClick={onClick} disabled={disabled} style={{ borderColor: '#87CEEB', color: '#87CEEB' }}>
      로그인
    </Button>
  );
};

export default LoginButton;
