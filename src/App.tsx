import { Button, Container, Row, Col } from 'react-bootstrap'; // Added Container, Row, Col
// ... other imports ...

function App() {
  // ... state declarations ...

  return (
    <Container> {/* Use Bootstrap Container for proper layout */}
      <Row className="mb-4 align-items-center"> {/* Use Row for horizontal layout */}
        <Col className="text-center"> {/* Column for centered H1 */}
          <h1 className="mb-0">AI 아이디어 추천기</h1>
        </Col>
        <Col xs="auto" className="text-end">
          <div>Authentication Placeholder</div>
        </Col>
      </Row>
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
    </Container>
  );
}

export default App;