import { useState } from 'react';

import SignForm from 'components/SignForm';
import SocialSignIn from 'components/SocialSignIn';

function Auth() {
  const [newAccount, setNewAccount] = useState(true);

  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
  };

  return (
    <div>
      <SignForm newAccount={newAccount} />
      <span onClick={toggleAccount}>
        {newAccount ? 'Sign In' : 'Create Account'}
      </span>
      <SocialSignIn />
      Auth
    </div>
  );
}

export default Auth;
