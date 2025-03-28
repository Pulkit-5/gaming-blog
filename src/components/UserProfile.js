import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function UserProfile({ navigateTo }) {
  const { user, logOut } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  if (!user) {
    return null;
  }

  return (
    <div className="user-profile">
      <div 
        className="user-profile-button"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <img 
          src={user.photoURL} 
          alt={user.displayName} 
          className="user-avatar" 
        />
        <span className="user-name">{user.displayName}</span>
      </div>
      
      {showDropdown && (
        <div className="profile-dropdown">
          <div className="dropdown-header">
            <img 
              src={user.photoURL} 
              alt={user.displayName} 
              className="dropdown-avatar" 
            />
            <div className="dropdown-user-info">
              <p className="dropdown-name">{user.displayName}</p>
              <p className="dropdown-email">{user.email}</p>
            </div>
          </div>
          <div className="dropdown-divider"></div>
          <div className="dropdown-item" onClick={() => navigateTo('profile')}>
            <i className="fas fa-user"></i>
            <span>My Profile</span>
          </div>
          <div className="dropdown-item" onClick={() => navigateTo('bookmarks')}>
            <i className="fas fa-bookmark"></i>
            <span>Bookmarks</span>
          </div>
          <div className="dropdown-divider"></div>
          <div className="dropdown-item logout" onClick={logOut}>
            <i className="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile; 