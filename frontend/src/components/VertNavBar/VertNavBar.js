import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoHome, IoPint } from 'react-icons/io5';
import { BiExpandHorizontal } from 'react-icons/bi';
import { FaHandshakeSimple } from 'react-icons/fa6';
import { FiLogOut } from 'react-icons/fi';
import '../VertNavBar/VertNavBar.css';
import isTokenValid from '../Utility/isTokenValid';

const VertNavbar = ({ expanded, toggleExpand }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userToken, setUserToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const isValidToken = isTokenValid(userToken);
    setIsLoggedIn(isValidToken);
  }, [userToken]);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className={`VertNavbar ${expanded ? 'expanded' : ''}`}>
      <div className="VertNavbar-links">
        <ul>
          <li onClick={toggleExpand}><BiExpandHorizontal className="react-icon" size={30} /></li>
          <li className="spacer"></li>
          <li><a href="/"><span>Home</span><IoHome className="react-icon" size={30} /></a></li>
          <li><a href="/userlist"><span>New Bet</span><FaHandshakeSimple className="react-icon" size={30} /></a></li>
          <li><span>Option 3</span><IoPint className="react-icon" size={30} /></li>
        </ul>
      </div>

      <div className="bottom-section">
        <ul>
          {isLoggedIn ? (
            <li className="logout-option" onClick={logout}><span>Log Out</span><FiLogOut className="react-icon" size={30} /></li>
          ) : (
            <li>
            <li className="logout-option" ><a href="/login"><span>Sign In</span><FiLogOut className="react-icon" size={30} /></a></li>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default VertNavbar;
