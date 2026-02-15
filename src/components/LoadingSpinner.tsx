import React from 'react';

interface LoadingSpinnerProps {
  isLoading: boolean;
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ isLoading, message }) => {
  if (!isLoading) {
    return null;
  }

  return (
    <div className="text-center mt-3">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-2">{message || "아이디어를 생성 중입니다..."}</p>
    </div>
  );
};

export default LoadingSpinner;
