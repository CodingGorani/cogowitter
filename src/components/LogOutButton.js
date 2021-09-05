import { useHistory } from 'react-router-dom';
import { auth } from 'fbInstance';

function LogOutButton() {
  const history = useHistory();

  const handleLogOutCLick = () => {
    auth.signOut();
    history.push('/');
  };
  return <button onClick={handleLogOutCLick}>Log Out</button>;
}

export default LogOutButton;
