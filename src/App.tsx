import React, { useState, useEffect } from 'react';
import './App.css';
import IdeaInput from './components/IdeaInput';
import GenerateButton from './components/GenerateButton';
import IdeaList from './components/IdeaList';
import LoadingSpinner from './components/LoadingSpinner';
import IdeaDetailModal from './components/IdeaDetailModal'; // Import the new modal component
import { generateIdeasFromAPI } from './services/api'; // Import the real API call
import { getIdeaDetailsFromAPI } from './services/api'; // Will be created soon

const LOCAL_STORAGE_LIKED_IDEAS_KEY = 'likedIdeas';

function App() {
  const [topic, setTopic] = useState<string>('');
  const [ideas, setIdeas] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
  const [selectedIdea, setSelectedIdea] = useState<string>('');
  const [detailedIdeaData, setDetailedIdeaData] = useState<string[]>([]);
  const [isDetailLoading, setIsDetailLoading] = useState<boolean>(false);
  const [detailError, setDetailError] = useState<string | null>(null);

  const [likedIdeas, setLikedIdeas] = useState<string[]>(() => {
    // Initialize liked ideas from localStorage
    const saved = localStorage.getItem(LOCAL_STORAGE_LIKED_IDEAS_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  // Save liked ideas to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_LIKED_IDEAS_KEY, JSON.stringify(likedIdeas));
  }, [likedIdeas]);

  const handleTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTopic(e.target.value);
  };

  const generateIdeas = async () => {
    if (!topic.trim()) {
      alert('주제를 입력해주세요!');
      return;
    }

    setIsLoading(true);
    setError(null);
    setIdeas([]); // Clear previous ideas

    try {
      const generatedIdeas = await generateIdeasFromAPI(topic);
      setIdeas(generatedIdeas);
    } catch (err: any) {
      setError(err.message || '아이디어 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleIdeaClick = async (idea: string) => {
    setSelectedIdea(idea);
    setShowDetailModal(true);
    setDetailedIdeaData([]);
    setIsDetailLoading(true);
    setDetailError(null);

    try {
      const details = await getIdeaDetailsFromAPI(idea);
      setDetailedIdeaData(details);
    } catch (err: any) {
      setDetailError(err.message || '아이디어 세부 정보를 불러오는 중 오류가 발생했습니다.');
      console.error(err);
    } finally {
      setIsDetailLoading(false);
    }
  };

  const handleToggleLike = (idea: string) => {
    setLikedIdeas(prevLikedIdeas => {
      if (prevLikedIdeas.includes(idea)) {
        // If already liked, remove it
        return prevLikedIdeas.filter(likedIdea => likedIdea !== idea);
      } else {
        // If not liked, add it
        return [...prevLikedIdeas, idea];
      }
    });
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelectedIdea('');
    setDetailedIdeaData([]);
    setDetailError(null);
  };

  return (
    <div className="container">
      <h1 className="text-center mb-4">AI 아이디어 추천기</h1>
      <div className="card p-4 shadow-sm">
        {/* <p className="text-center text-muted">
          현재는 UI 요소만 표시됩니다. 기능은 비활성화되어 있습니다.
        </p> */}
        
        <IdeaInput
          value={topic}
          onChange={handleTopicChange}
          placeholder="예: 새로운 앱, 마케팅 전략"
          disabled={isLoading}
        />
        <GenerateButton onClick={generateIdeas} disabled={isLoading} />

        <LoadingSpinner isLoading={isLoading} />

        {error && (
          <div className="alert alert-danger mt-3" role="alert">
            {error}
          </div>
        )}

        {!isLoading && ideas.length > 0 && (
          <IdeaList
            ideas={ideas}
            onIdeaClick={handleIdeaClick}
            likedIdeas={likedIdeas}
            onToggleLike={handleToggleLike}
          />
        )}
        {!isLoading && ideas.length === 0 && !error && topic.trim() && (
            <p className="text-muted mt-3">아이디어를 생성하려면 버튼을 클릭하세요.</p>
        )}
      </div>

      <IdeaDetailModal
        show={showDetailModal}
        onHide={handleCloseDetailModal}
        ideaTitle={selectedIdea}
        details={detailedIdeaData}
        isLoading={isDetailLoading}
        error={detailError}
      />
    </div>
  );
}

export default App;
