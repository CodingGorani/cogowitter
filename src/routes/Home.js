import Cogowits from 'components/Cogowits';
import CogowitForm from 'components/CogowitForm';
import { Container } from 'components/atoms/Container';

function Home({ userObj }) {
  return (
    <Container background>
      <CogowitForm userObj={userObj} />
      <Cogowits userObj={userObj} />
    </Container>
  );
}
export default Home;
