import { useHistory } from 'react-router-dom';
import { auth } from 'fbInstance';
import { Button } from './atoms/Button';

function LogOutButton() {
  const history = useHistory();

  const handleLogOutCLick = () => {
    auth.signOut();
    history.push('/');
  };
  return <Button onClick={handleLogOutCLick}>Log Out</Button>;
}

export default LogOutButton;
