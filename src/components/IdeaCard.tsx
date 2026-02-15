import React from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa'; // Import star icons

interface IdeaCardProps {
  idea: string;
  index: number;
  onClick: (idea: string) => void;
  isLiked: boolean; // New prop: true if idea is liked
  onToggleLike: (idea: string) => void; // New prop: handler to toggle like status
}

const IdeaCard: React.FC<IdeaCardProps> = ({ idea, index, onClick, isLiked, onToggleLike }) => {
  // Prevent card click when star is clicked
  const handleStarClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Stop event propagation to the card
    onToggleLike(idea);
  };

  return (
    <div className="card idea-card mb-3" onClick={() => onClick(idea)} style={{ cursor: 'pointer' }}>
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>
          <h5 className="card-title">아이디어 #{index + 1}</h5>
          <p className="card-text text-center">{idea}</p>
        </div>
        <div onClick={handleStarClick} style={{ cursor: 'pointer' }}>
          {isLiked ? (
            <FaStar color="#87CEEB" size={24} /> // Filled star, sky blue
          ) : (
            <FaRegStar color="#87CEEB" size={24} /> // Outlined star, sky blue
          )}
        </div>
      </div>
    </div>
  );
};

export default IdeaCard;
