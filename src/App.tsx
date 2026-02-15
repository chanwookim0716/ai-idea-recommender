import React, { useState, useEffect } from 'react';
import './App.css';
import IdeaInput from './components/IdeaInput';
import GenerateButton from './components/GenerateButton';
import IdeaList from './components/IdeaList';
import LoadingSpinner from './components/LoadingSpinner';
import IdeaDetailModal from './components/IdeaDetailModal';
import LikedIdeasList from './components/LikedIdeasList';
import LoginButton from './components/LoginButton';
import SignupButton from './components/SignupButton';
import AuthForm from './components/AuthForm'; // Import AuthForm
import { generateIdeasFromAPI } from './services/api';
import { getIdeaDetailsFromAPI } from './services/api';
import { onAuthStateChange, signOut } from './services/auth';
import { User } from '@supabase/supabase-js';
import { Button } from 'react-bootstrap'; // Needed for Logout Button

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
    const saved = localStorage.getItem(LOCAL_STORAGE_LIKED_IDEAS_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [isAuthLogin, setIsAuthLogin] = useState<boolean>(true);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_LIKED_IDEAS_KEY, JSON.stringify(likedIdeas));
  }, [likedIdeas]);

  useEffect(() => {
    const { data: authListener } = onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

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
    setIdeas([]);

    try {
      const generatedIdeas = await generateIdeasFromAPI(topic);
      setIdeas(generatedIdeas);
      setTopic('');
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
        return prevLikedIdeas.filter(likedIdea => likedIdea !== idea);
      } else {
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

  const handleLogout = async () => {
    try {
      await signOut();
      alert('로그아웃 되었습니다.');
    } catch (err: any) {
      alert(`로그아웃 실패: ${err.message}`);
    }
  };

  const handleLoginClick = () => {
    setIsAuthLogin(true);
    setShowAuthModal(true);
  };

  const handleSignupClick = () => {
    setIsAuthLogin(false);
    setShowAuthModal(true);
  };

  const handleCloseAuthModal = () => {
    setShowAuthModal(false);
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-center mb-0">AI 아이디어 추천기</h1>
        <div>
          {user ? (
            <div className="d-flex align-items-center">
              <span className="me-2">환영합니다, {user.email || '사용자'}님!</span>
              <Button variant="outline-secondary" onClick={handleLogout}>로그아웃</Button>
            </div>
          ) : (
            <>
              <LoginButton onClick={handleLoginClick} />
              <SignupButton onClick={handleSignupClick} className="ms-2" />
            </>
          )}
        </div>
      </div>
      <div className="card p-4 shadow-sm">
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

      <div className="card p-4 shadow-sm mt-5">
        <LikedIdeasList
          likedIdeas={likedIdeas}
          onIdeaClick={handleIdeaClick}
          onToggleLike={handleToggleLike}
        />
      </div>

      <IdeaDetailModal
        show={showDetailModal}
        onHide={handleCloseDetailModal}
        ideaTitle={selectedIdea}
        details={detailedIdeaData}
        isLoading={isDetailLoading}
        error={detailError}
      />

      <AuthForm show={showAuthModal} onHide={handleCloseAuthModal} isLoginMode={isAuthLogin} />
    </div>
  );
}

export default App;