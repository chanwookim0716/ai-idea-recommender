import React from 'react';
import { Button } from 'react-bootstrap';

interface SignupButtonProps {
  onClick: () => void;
  disabled?: boolean;
  className?: string; // Allow passing className
}

const SignupButton: React.FC<SignupButtonProps> = ({ onClick, disabled }) => {
  return (
    <Button variant="primary" onClick={onClick} disabled={disabled} className="signup-button-custom">
      회원가입
    </Button>
  );
};

export default SignupButton;
