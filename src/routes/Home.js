import Cogowits from 'components/Cogowits';
import CogowitForm from 'components/CogowitForm';
import { Container } from 'components/atoms/Container';
import { H1 } from 'components/atoms/Typo';

function Home({ userObj }) {
  return (
    <Container background>
      <H1>Cogowit</H1>
      <CogowitForm userObj={userObj} />
      <Cogowits userObj={userObj} />
    </Container>
  );
}
export default Home;
