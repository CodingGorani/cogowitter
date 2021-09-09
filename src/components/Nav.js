import { Link } from 'react-router-dom';
import { Button } from './atoms/Button';
import { FlexBox } from './atoms/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook, faHome } from '@fortawesome/free-solid-svg-icons';

function Nav({ userObj }) {
  return (
    <nav>
      <FlexBox right as="ul">
        <Link to="/">
          <Button noShadow small list as="li">
            <FontAwesomeIcon icon={faHome} />
          </Button>
        </Link>
        <Link to="/profile">
          <Button noShadow small list as="li">
            <FontAwesomeIcon icon={faAddressBook} />
          </Button>
        </Link>
      </FlexBox>
    </nav>
  );
}

export default Nav;
