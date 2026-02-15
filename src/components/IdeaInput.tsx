import React from 'react';

interface IdeaInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
}

const IdeaInput: React.FC<IdeaInputProps> = ({ value, onChange, placeholder, disabled }) => {
  return (
    <div className="mb-3">
      <label htmlFor="topicInput" className="form-label">
        아이디어를 얻고 싶은 주제를 입력하세요:
      </label>
      <input
        type="text"
        className="form-control"
        id="topicInput"
        placeholder={placeholder || "예: 새로운 앱, 마케팅 전략, 콘텐츠 아이디어"}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
};

export default IdeaInput;
