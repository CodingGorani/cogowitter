import { useState } from 'react';
import { auth } from 'fbInstance';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

function SignForm({ newAccount }) {
  const [authInfo, setAuthInfo] = useState({
    email: '',
    pwd: '',
  });
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
  return (
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
  );
}

export default SignForm;
