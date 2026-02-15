import React from 'react';
import { Button } from 'react-bootstrap';

interface SignupButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const SignupButton: React.FC<SignupButtonProps> = ({ onClick, disabled }) => {
  return (
    <Button variant="primary" onClick={onClick} disabled={disabled} style={{ backgroundColor: '#87CEEB', borderColor: '#87CEEB' }}>
      회원가입
    </Button>
  );
};

export default SignupButton;
