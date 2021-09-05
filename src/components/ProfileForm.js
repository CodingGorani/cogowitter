import React, { useState } from 'react';
import { updateProfile } from '@firebase/auth';
import { auth } from 'fbInstance';

function ProfileForm({ refreshUser, userObj }) {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      try {
        await updateProfile(auth.currentUser, { displayName: newDisplayName });
        refreshUser();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleNameChange = (e) => {
    const { value } = e.target;
    setNewDisplayName(value);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Display name"
        value={newDisplayName}
        onChange={handleNameChange}
      />
      <input type="submit" value="Update Profile" />
    </form>
  );
}

export default ProfileForm;
