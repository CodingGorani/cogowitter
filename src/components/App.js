import { useState, useEffect } from 'react';
import AppRouter from './Router';
import { auth } from '../fbInstance';
import { onAuthStateChanged } from 'firebase/auth';
import { Container } from './atoms/Container';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    const authChangeListener = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('user', user);
        setIsLoggedIn(true);
        setUserObj({
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
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
    setUserObj({
      uid: user.uid,
      displayName: user.displayName,
    });
  };

  return (
    <>
      {init ? (
        <Container background>
          <AppRouter
            refreshUser={refreshUser}
            isLoggedIn={isLoggedIn}
            userObj={userObj}
          />
        </Container>
      ) : (
        'Initializing...'
      )}
      <footer>&copy; {new Date().getFullYear()} Cogowitter</footer>
    </>
  );
}

export default App;
