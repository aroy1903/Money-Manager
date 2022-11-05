import { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
  const [username, setUsername] = useState('');
  const { error, pending, signup } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();

    signup(email, password, username);
  };
  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit}>
        <h3>Signup</h3>
        {error && <p style={{ marginBottom: 10 }}>{error}</p>}
        <label>
          <span>email:</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          <span>password:</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPass(e.target.value)}
            required
          />
        </label>
        <label>
          <span>username:</span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {!pending && (
          <button type="submit" className="btn">
            Submit
          </button>
        )}
        {pending && (
          <button className="btn" disabled>
            Loading
          </button>
        )}
      </form>
    </div>
  );
}
