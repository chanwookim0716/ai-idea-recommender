import { Button, Container, Row, Col } from 'react-bootstrap';
import './App.css';
import IdeaInput from './components/IdeaInput';
import GenerateButton from './components/GenerateButton';
import IdeaList from './components/IdeaList';
import LoadingSpinner from './components/LoadingSpinner';
import IdeaDetailModal from './components/IdeaDetailModal';
import LikedIdeasList from './components/LikedIdeasList';
import LoginButton from './components/LoginButton';
import SignupButton from './components/SignupButton';
import AuthForm from './components/AuthForm';
import { generateIdeasFromAPI, getIdeaDetailsFromAPI } from './services/api';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { onAuthStateChange, signOut } from './services/auth';
import { User } from '@supabase/supabase-js';
import { useLikedIdeas } from './hooks/useLikedIdeas';

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

  // Memoized cache for idea details
  const detailsCache = useMemo(() => new Map<string, string[]>(), []);

  const { likedIdeas, toggleLike } = useLikedIdeas();

  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [isAuthLogin, setIsAuthLogin] = useState<boolean>(true);
  const [isHoveringProfile, setIsHoveringProfile] = useState<boolean>(false);

  useEffect(() => {
    const { data: authListener } = onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
    return () => authListener?.subscription.unsubscribe();
  }, []);

  const handleTopicChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTopic(e.target.value);
  }, []);

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
      setError(err.message || '아이디어 생성 중 오류가 발생했습니다.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleIdeaClick = useCallback(async (idea: string) => {
    setSelectedIdea(idea);
    setShowDetailModal(true);
    setDetailedIdeaData([]);
    setIsDetailLoading(true);
    setDetailError(null);

    // Check cache first
    if (detailsCache.has(idea)) {
      setDetailedIdeaData(detailsCache.get(idea)!);
      setIsDetailLoading(false);
      return;
    }

    try {
      const details = await getIdeaDetailsFromAPI(idea);
      detailsCache.set(idea, details); // Store in cache
      setDetailedIdeaData(details);
    } catch (err: any) {
      setDetailError(err.message || '세부 정보를 불러오는 중 오류가 발생했습니다.');
      console.error(err);
    } finally {
      setIsDetailLoading(false);
    }
  }, [detailsCache]);

  const handleCloseDetailModal = useCallback(() => {
    setShowDetailModal(false);
    setSelectedIdea('');
    setDetailedIdeaData([]);
    setDetailError(null);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
      setUser(null);
      alert('로그아웃 되었습니다.');
    } catch (err: any) {
      alert(`로그아웃 실패: ${err.message}`);
    }
  };

  const openAuthModal = useCallback((loginMode: boolean) => {
    setIsAuthLogin(loginMode);
    setShowAuthModal(true);
  }, []);

  const userDisplayName = useMemo(() => 
    user?.email || user?.user_metadata?.nickname || '환영합니다!', 
    [user]
  );

  return (
    <>
      <header style={{ position: 'fixed', top: '10px', right: '10px', zIndex: 1000 }} className="d-flex gap-2">
        {user ? (
          <div
            className="d-flex flex-column align-items-center"
            onMouseEnter={() => setIsHoveringProfile(true)}
            onMouseLeave={() => setIsHoveringProfile(false)}
            style={{ position: 'relative' }}
          >
            <div className="d-flex align-items-center gap-2">
              {user.user_metadata?.avatar_url && (
                <img
                  src={user.user_metadata.avatar_url}
                  alt="Avatar"
                  style={{ width: '32px', height: '32px', borderRadius: '50%' }}
                />
              )}
              <span className="text-muted">{userDisplayName}</span>
            </div>
            {isHoveringProfile && (
              <Button variant="outline-danger" onClick={handleLogout} size="sm" className="mt-1">
                로그아웃
              </Button>
            )}
          </div>
        ) : (
          <>
            <LoginButton onClick={() => openAuthModal(true)} />
            <SignupButton onClick={() => openAuthModal(false)} />
          </>
        )}
      </header>

      <Container>
        <Row className="mb-4 mt-5">
          <Col className="text-center">
            <h1>AI 아이디어 추천기</h1>
          </Col>
        </Row>
        
        <section className="card p-4 shadow-sm">
          <IdeaInput
            value={topic}
            onChange={handleTopicChange}
            placeholder="예: 새로운 앱, 마케팅 전략"
            disabled={isLoading}
          />
          <GenerateButton onClick={generateIdeas} disabled={isLoading} />
          <LoadingSpinner isLoading={isLoading} />
          {isLoading && <p className="text-center mt-2 text-muted">AI 아이디어를 생성 중입니다...</p>}

          {error && (
            <div className="alert alert-danger mt-3" role="alert">
              {error.includes('네트워크')
                ? '네트워크 연결에 문제가 있습니다. 인터넷 연결을 확인해 주세요.'
                : '아이디어를 생성하는 도중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.'}
            </div>
          )}

          {!isLoading && ideas.length > 0 && (
            <IdeaList
              ideas={ideas}
              onIdeaClick={handleIdeaClick}
              likedIdeas={likedIdeas}
              onToggleLike={toggleLike}
            />
          )}
        </section>

        <section className="card p-4 shadow-sm mt-5 mb-5">
          <LikedIdeasList
            likedIdeas={likedIdeas}
            onIdeaClick={handleIdeaClick}
            onToggleLike={toggleLike}
          />
        </section>

        <IdeaDetailModal
          show={showDetailModal}
          onHide={handleCloseDetailModal}
          ideaTitle={selectedIdea}
          details={detailedIdeaData}
          isLoading={isDetailLoading}
          error={detailError}
        />

        <AuthForm 
          show={showAuthModal} 
          onHide={() => setShowAuthModal(false)} 
          isLoginMode={isAuthLogin} 
        />
      </Container>
    </>
  );
}

export default App;
