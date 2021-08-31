import auth from 'fbInstance';
import { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
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
        <button>Continue with Google</button>
        <button>Continue with Github</button>
      </div>
      Auth
    </div>
  );
}

export default Auth;
