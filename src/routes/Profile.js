import { auth } from 'fbInstance';
import React from 'react';
import { useHistory } from 'react-router-dom';

function Profile({ userObj }) {
  const history = useHistory();
  const handleLogOutCLick = () => {
    auth.signOut();
    history.push('/');
  };
  return (
    <>
      <button onClick={handleLogOutCLick}>Log Out</button>
    </>
  );
}

export default Profile;
