import { firebase, auth } from 'fbInstance';
import { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';

function Auth() {
  const [authInfo, setAuthInfo] = useState({
    email: '',
    pwd: '',
  });
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { value, name } = e.target;
    console.log(name);
    setAuthInfo({
      ...authInfo,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, pwd } = authInfo;
    let data;
    try {
      if (newAccount) {
        //create account
        data = await createUserWithEmailAndPassword(auth, email, pwd);
      } else {
        //log in
        data = await signInWithEmailAndPassword(auth, email, pwd);
      }
      console.log(data);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
  };

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
      console.log('소셜로그인', data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={authInfo.email}
          onChange={handleChange}
        />
        <input
          name="pwd"
          type="password"
          placeholder="Password"
          required
          value={authInfo.pwd}
          onChange={handleChange}
        />
        <input type="submit" value={newAccount ? 'Create Account' : 'Log In'} />
        {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? 'Sign In' : 'Create Account'}
      </span>
      <div>
        <button name="google" onClick={handleSocialClick}>
          Continue with Google
        </button>
        <button name="github" onClick={handleSocialClick}>
          Continue with Github
        </button>
      </div>
      Auth
    </div>
  );
}

export default Auth;
