import React, { useState } from 'react';
import { Modal, Button, Form, Alert, Spinner } from 'react-bootstrap';
import { signIn, signUp } from '../services/auth';
import { supabase } from '../services/supabase'; // Import supabase client
import { FaGoogle } from 'react-icons/fa'; // Import Google icon


interface AuthFormProps {
  show: boolean;
  onHide: () => void;
  isLoginMode: boolean; // New prop
}

const AuthForm: React.FC<AuthFormProps> = ({ show, onHide, isLoginMode: initialIsLoginMode }) => {
  const isLogin = initialIsLoginMode; // Mode is now fixed by prop
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

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin, // Redirects back to your app's origin after auth
      },
    });
    if (error) {
      console.error('Error signing in with Google:', error.message);
      setMessage('Google 로그인 실패: ' + error.message);
      setMessageType('danger');
    }
  };



  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton={false} style={{ borderColor: '#6BB9FA', borderBottom: '1px solid #6BB9FA' }}>
        <Modal.Title>{isLogin ? '로그인' : '회원가입'}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ borderColor: '#6BB9FA' }}>
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

          <Button variant="primary" type="submit" disabled={loading} style={{ backgroundColor: '#4EA5F4', borderColor: '#4EA5F4' }}>
            {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" /> : null}
            {isLogin ? '로그인' : '회원가입'}
          </Button>
        </Form>

        <div className="d-flex flex-column mt-3 gap-2">
          <div className="text-center text-muted">또는</div>
          <Button variant="outline-dark" onClick={handleGoogleLogin} disabled={loading} className="d-flex align-items-center justify-content-center" style={{ borderColor: '#DB4437', color: '#DB4437' }}>
            <FaGoogle className="me-2" /> Google로 로그인
          </Button>
        </div>
      </Modal.Body>
      <Modal.Footer style={{ borderColor: '#6BB9FA', borderTop: '1px solid #6BB9FA' }}>
        <Button 
          variant="outline-secondary" 
          onClick={onHide}
          style={{ 
            borderColor: '#6BB9FA', 
            color: '#6BB9FA',
            fontWeight: '600'
          }}
        >
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AuthForm;
