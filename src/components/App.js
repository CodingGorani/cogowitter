import { useState, useEffect } from 'react';
import AppRouter from './Router';
import { auth } from '../fbInstance';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    const authChangeListener = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj({
          uid: user.uid,
          displayName: user.displayName,
        });
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });

    return () => {
      authChangeListener();
    };
  }, []);

  const refreshUser = () => {
    const user = auth.currentUser;
    console.log('user확인', user);
    setUserObj({
      uid: user.uid,
      displayName: user.displayName,
    });
  };

  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={isLoggedIn}
          userObj={userObj}
        />
      ) : (
        'Initializing...'
      )}
      <footer>&copy; {new Date().getFullYear()} Cogowitter</footer>
    </>
  );
}

export default App;
