import { useState, useEffect } from 'react';

const FetchUserDataByID = (userID) => {
  const [token, setToken] = useState(window.localStorage.getItem('token'));
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (token && userID) {
      fetch(`/userData/${userID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then(async (data) => {
          window.localStorage.setItem('token', data.token);
          setToken(data.token);
          setUserData(data.user);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [userID, token]);

  return userData;
};

export default FetchUserDataByID;

// Use Example:

// import FetchUserDataByID from '../utility/getselectuserinfo';
// const FoundUser = FetchUserDataByID(userID);
// const userEmail = FoundUser && FoundUser.email ? FoundUser.email : '';