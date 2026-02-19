import React from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap'; // Assuming react-bootstrap is installed

interface IdeaDetailModalProps {
  show: boolean;
  onHide: () => void;
  ideaTitle: string;
  details: string[]; // Details as an array of strings (lines)
  isLoading: boolean;
  error: string | null;
}

const IdeaDetailModal: React.FC<IdeaDetailModalProps> = ({
  show,
  onHide,
  ideaTitle,
  details,
  isLoading,
  error,
}) => {
  const renderDetailLine = (line: string, index: number) => {
    // Check if it's a heading (e.g., "1. 핵심 개념")
    if (/^\d+\./.test(line)) {
      return (
        <h5 key={index} className="mt-4 mb-2" style={{ color: '#007bff', fontWeight: 'bold' }}>
          {line}
        </h5>
      );
    }
    // Check if it's a bullet point
    if (line.startsWith('-') || line.startsWith('•') || line.startsWith('*')) {
      return (
        <li key={index} className="ms-3 mb-1">
          {line.replace(/^[-•*]\s*/, '')}
        </li>
      );
    }
    // Default paragraph
    return <p key={index} className="mb-1">{line}</p>;
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered contentClassName="modal-custom-border">
      <Modal.Header closeButton={false} style={{ borderColor: '#6BB9FA', borderBottom: '1px solid #6BB9FA' }}>
        <Modal.Title>{ideaTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ borderColor: '#6BB9FA' }}>
        {isLoading && (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading details...</span>
            </Spinner>
            <p className="mt-2">세부 정보를 불러오는 중입니다...</p>
          </div>
        )}
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        {!isLoading && !error && details.length > 0 && (
          <div className="detail-content">
            {details.map((line, index) => renderDetailLine(line, index))}
          </div>
        )}
        {!isLoading && !error && details.length === 0 && (
          <p className="text-muted">아직 세부 정보가 없습니다.</p>
        )}
      </Modal.Body>
      <Modal.Footer style={{ borderColor: '#6BB9FA', borderTop: '1px solid #6BB9FA' }}>
        <Button 
          variant="outline-primary" 
          onClick={onHide}
          style={{ 
            borderColor: '#6BB9FA', 
            color: '#6BB9FA',
            fontWeight: '600'
          }}
          className="close-modal-btn"
        >
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default IdeaDetailModal;
