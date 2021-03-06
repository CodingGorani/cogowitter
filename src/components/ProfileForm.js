import React, { useState, useRef } from 'react';
import { updateProfile } from '@firebase/auth';
import { auth, firestore } from 'fbInstance';
import { Input } from './atoms/Input';
import { Button } from './atoms/Button';
import { FlexBox } from './atoms/Container';
import { where, query, onSnapshot } from 'firebase/firestore';
import { useEffect } from 'react/cjs/react.development';
import { collection, doc, updateDoc } from '@firebase/firestore';

function ProfileForm({ refreshUser, userObj }) {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const [userInfoId, setUserInfoId] = useState('');
  const [profileFoto, setProfileFoto] = useState('');
  const [attachment, setAttachment] = useState('');
  const fileInput = useRef();

  useEffect(() => {
    const listener = onSnapshot(
      query(collection(firestore, '/user'), where('uid', '==', userObj.uid)),
      {
        next: (snapshot) => {
          snapshot.docs.map((doc) => {
            setUserInfoId(doc.id);
            if (doc.photoURL) {
              setProfileFoto(doc.photoURL);
            } else {
              setProfileFoto(userObj.photoURL);
            }
          });
        },
        error: (error) => {
          console.log(error);
        },
      }
    );
    return () => {
      listener();
    };
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName || attachment) {
      try {
        console.group('유저확인');
        console.log('현재유저', auth.currentUser);
        console.groupEnd();
        await updateProfile(auth.currentUser, {
          displayName: newDisplayName,
          photoURL: attachment,
        });
        await updateDoc(doc(collection(firestore, '/user'), '/', userInfoId), {
          displayName: newDisplayName,
          photoURL: attachment,
        });
        handleClearAttachment();
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

  const handleFileChange = (e) => {
    const { files } = e.target;
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      console.log(finishedEvent);
      setAttachment(finishedEvent.currentTarget.result);
    };
    if (files) {
      reader.readAsDataURL(files[0]);
    }
  };

  const handleClearAttachment = () => {
    setAttachment(null);
    fileInput.current.value = null;
  };

  return (
    <FlexBox>
      {profileFoto && <img src={profileFoto} width="50px" height="50px" />}
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Display Name"
          value={newDisplayName}
          onChange={handleNameChange}
        />
        <Input
          type="file"
          accept="image/*"
          ref={fileInput}
          onChange={handleFileChange}
        />
        <Button as="input" type="submit" value="Update Profile" />
      </form>
      {attachment && (
        <div>
          <img src={attachment} width="50px" height="50px" />
          <Button onClick={handleClearAttachment}>Clear</Button>
        </div>
      )}
    </FlexBox>
  );
}

export default ProfileForm;
