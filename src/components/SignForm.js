import { useState } from 'react';
import { auth } from 'fbInstance';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { Input } from './atoms/Input';
import { Button } from './atoms/Button';
import { FlexBox } from './atoms/Container';
import addUserInfo from 'utils';

function SignForm() {
  const [newAccount, setNewAccount] = useState(true);
  const [authInfo, setAuthInfo] = useState({
    email: '',
    pwd: '',
  });
  const [error, setError] = useState('');

  const toggleAccount = (e) => {
    e.preventDefault();
    setNewAccount((prev) => !prev);
  };

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
      addUserInfo(data);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };
  return (
    <FlexBox wrapper as="form" onSubmit={handleSubmit}>
      <Input
        name="email"
        type="email"
        placeholder="Email"
        required
        value={authInfo.email}
        onChange={handleChange}
      />
      <Input
        name="pwd"
        type="password"
        placeholder="Password"
        required
        value={authInfo.pwd}
        onChange={handleChange}
      />
      <Button
        primary
        as="input"
        type="submit"
        value={newAccount ? 'Create Account' : 'Log In'}
      />
      {error}
      <Button noShadow onClick={toggleAccount}>
        {newAccount ? 'Sign In' : 'Create Account'}
      </Button>
    </FlexBox>
  );
}

export default SignForm;
