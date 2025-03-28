import React from 'react';
import { useAuth } from '../context/AuthContext';

function LoginButton() {
  const { user, signInWithGoogle, logOut } = useAuth();

  return (
    <>
      {user ? (
        <div className="auth-button" onClick={logOut}>
          <img src={user.photoURL} alt={user.displayName} className="user-avatar" />
          <span>Logout</span>
        </div>
      ) : (
        <div className="auth-button" onClick={signInWithGoogle}>
          <i className="fab fa-google"></i>
          <span>Sign In</span>
        </div>
      )}
    </>
  );
}

export default LoginButton; 