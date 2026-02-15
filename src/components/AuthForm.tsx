import React, { useState } from 'react';
import { Modal, Button, Form, Alert, Spinner } from 'react-bootstrap';
import { signIn, signUp } from '../services/auth';

interface AuthFormProps {
  show: boolean;
  onHide: () => void;
  isLoginMode: boolean; // New prop
}

const AuthForm: React.FC<AuthFormProps> = ({ show, onHide, isLoginMode: initialIsLoginMode }) => {
  const [isLogin, setIsLogin] = useState(initialIsLoginMode); // Initialize based on prop
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'danger' | 'info'>('info');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (isLogin) {
        await signIn(email, password);
        setMessageType('success');
        setMessage('로그인 성공! 잠시 후 자동으로 닫힙니다.');
        onHide(); // Close modal on success
      } else {
        await signUp(email, password);
        setMessageType('success');
        setMessage('회원가입 성공! 이메일 확인 후 로그인해주세요.');
      }
    } catch (error: any) {
      setMessageType('danger');
      setMessage(`인증 실패: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isLogin ? '로그인' : '회원가입'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {message && <Alert variant={messageType}>{message}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>이메일 주소</Form.Label>
            <Form.Control
              type="email"
              placeholder="이메일을 입력하세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </Form.Group>

          <Button variant="primary" type="submit" disabled={loading} style={{ backgroundColor: '#87CEEB', borderColor: '#87CEEB' }}>
            {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" /> : null}
            {isLogin ? '로그인' : '회원가입'}
          </Button>
          <Button variant="link" onClick={() => setIsLogin(!isLogin)} disabled={loading}>
            {isLogin ? '회원가입' : '로그인'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AuthForm;
