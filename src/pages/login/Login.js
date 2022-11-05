import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';
import '../login/Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');

  const { error, pending, login } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="formContainer">
      <div className="backgroundBox">
        <form onSubmit={handleSubmit}>
          <h3>Login</h3>
          {error && <p style={{ textAlign: 'center' }}>{error}</p>}
          <label>
            <span>email:</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            <span>password:</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPass(e.target.value)}
            />
          </label>
          {!pending && (
            <button type="submit" className="btn">
              Submit
            </button>
          )}
          {pending && (
            <button className="btn" disabled>
              Loading...
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
