import React, { useState } from 'react';
import { updateProfile } from '@firebase/auth';
import { auth } from 'fbInstance';
import { Input } from './atoms/Input';
import { Button } from './atoms/Button';
import { FlexBox } from './atoms/Container';

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
    <FlexBox as="form" onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Display Name"
        value={newDisplayName}
        onChange={handleNameChange}
      />
      <Button as="input" type="submit" value="Update Profile" />
    </FlexBox>
  );
}

export default ProfileForm;
