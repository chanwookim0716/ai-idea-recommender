import React from 'react';

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
      아이디어 얻기
    </button>
  );
};

export default GenerateButton;
