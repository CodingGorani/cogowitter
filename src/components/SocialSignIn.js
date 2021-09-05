import React from 'react';
import { auth } from 'fbInstance';
import {
  GithubAuthProvider,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

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
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button name="google" onClick={handleSocialClick}>
        Continue with Google
      </button>
      <button name="github" onClick={handleSocialClick}>
        Continue with Github
      </button>
    </div>
  );
}

export default SocialSignIn;
