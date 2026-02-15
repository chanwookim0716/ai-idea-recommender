import React from 'react';

interface IdeaCardProps {
  idea: string;
  index: number;
}

const IdeaCard: React.FC<IdeaCardProps> = ({ idea, index }) => {
  return (
    <div className="card idea-card mb-3">
      <div className="card-body">
        <h5 className="card-title">아이디어 #{index + 1}</h5>
        <p className="card-text">{idea}</p>
      </div>
    </div>
  );
};

export default IdeaCard;
