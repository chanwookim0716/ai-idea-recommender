import React from 'react';
import { Spinner } from 'react-bootstrap'; // Import Spinner

interface GenerateButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const GenerateButton: React.FC<GenerateButtonProps> = ({ onClick, disabled }) => {
  return (
    <button
      type="button"
      className="btn btn-primary"
      onClick={onClick}
      disabled={disabled}
    >
      {disabled ? (
        <>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
            className="me-2"
          />
          <span>생성 중...</span>
        </>
      ) : (
        '아이디어 얻기'
      )}
    </button>
  );
};

export default GenerateButton;
