import React, { useState } from 'react';

const Friend = () => {
const [token, setToken] = useState(window.localStorage.getItem("token"));
  const addFriend = async () => {
    try {
      const response = await fetch(`userdata/addfriend`, {
        method: 'POST',
        headers: {
					'Authorization': `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
        body: JSON.stringify({
          user: "658d3b07214a7a1256a55a4c", // Replace with the user's ID whose friend list will be updated
          addingfriend: "65784bb12edaba69155c7499"
        }),
      });

      // Check if the request was successful (status code 200)
      if (response.ok) {console.log('Friend Added');} 
      else {console.error('Failed to add friend');}
    } catch (error) {console.error('Error adding friend:', error);}
  };

const removeFriend = () => {console.log('Friend Removed');};

  return (
    <div>
      Adding Friends
      <button onClick={addFriend}>Add Friend</button>
      <button onClick={removeFriend}>Remove Friend</button>
    </div>
  );
};

export default Friend;