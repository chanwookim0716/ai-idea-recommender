import React from 'react';
import { Button } from 'react-bootstrap';

interface SignupButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const SignupButton: React.FC<SignupButtonProps> = React.memo(({ onClick, disabled }) => {
  SignupButton.displayName = 'SignupButton';
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      style={{ backgroundColor: '#4682B4', borderColor: '#4682B4', color: 'white' }}
    >
      회원가입
    </Button>
  );
});

export default SignupButton;
