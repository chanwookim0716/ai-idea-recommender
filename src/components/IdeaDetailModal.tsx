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
  return (
    <Modal show={show} onHide={onHide} size="lg" centered contentClassName="modal-custom-border">
      <Modal.Header closeButton style={{ borderColor: '#6BB9FA', borderBottom: '1px solid #6BB9FA' }}>
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
          <div>
            {details.map((line, index) => (
              <p key={index} className="mb-1">{line}</p>
            ))}
          </div>
        )}
        {!isLoading && !error && details.length === 0 && (
          <p className="text-muted">아직 세부 정보가 없습니다.</p>
        )}
      </Modal.Body>
      <Modal.Footer style={{ borderColor: '#6BB9FA', borderTop: '1px solid #6BB9FA' }}>
        <Button variant="secondary" onClick={onHide}>
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default IdeaDetailModal;
