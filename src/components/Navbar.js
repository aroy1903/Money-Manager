import React from 'react';
import '../components/Navbar.css';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuth();
  return (
    <div className="navbar">
      <nav>
        <ul>
          <li>
            <h2>Money Manager</h2>
          </li>
          <div className="links" style={user ? { width: 300 } : { width: 120 }}>
            <li>{!user && <Link to="/login">Login</Link>}</li>
            <li>{!user && <Link to="/signup">Sign Up</Link>}</li>
            {user && <li>Welcome , {user?.displayName}!</li>}
            {user && (
              <li>
                <button className="btn" onClick={logout}>
                  Logout
                </button>
              </li>
            )}
          </div>
        </ul>
      </nav>
    </div>
  );
}
