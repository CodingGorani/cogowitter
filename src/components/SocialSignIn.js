import React from 'react';
import { auth } from 'fbInstance';
import {
  GithubAuthProvider,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { FlexBox } from './atoms/Container';
import { Button } from './atoms/Button';
import addUserInfo from 'utils';

function SocialSignIn() {
  const handleSocialClick = async (e) => {
    const { name } = e.target;
    try {
      let provider;
      if (name === 'google') {
        provider = new GoogleAuthProvider();
      } else if (name === 'github') {
        provider = new GithubAuthProvider();
      }
      const data = await signInWithPopup(auth, provider);
      addUserInfo(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <FlexBox wrapper>
      <Button name="google" onClick={handleSocialClick}>
        Continue with Google
      </Button>
      <Button name="github" onClick={handleSocialClick}>
        Continue with Github
      </Button>
    </FlexBox>
  );
}

export default SocialSignIn;
