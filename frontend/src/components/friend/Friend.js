import React from 'react';

const Friend = () => {
  const AddFriend = () => {console.log('Friend Added')};
  const RemoveFriend = () => {console.log('Friend Removed')};

  return (
    <div>
      Hello, world!
      <button onClick={AddFriend}>Add Friend</button>
      <button onClick={RemoveFriend}>Remove Friend</button>
    </div>
  );
};

export default Friend;