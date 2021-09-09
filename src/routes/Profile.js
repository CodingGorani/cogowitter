import ProfileForm from 'components/ProfileForm';
import LogOutButton from 'components/LogOutButton';
import MyCogowits from 'components/MyCogowits';
import { H1 } from 'components/atoms/Typo';

function Profile({ refreshUser, userObj }) {
  return (
    <>
      <H1>Profile</H1>
      <ProfileForm refreshUser={refreshUser} userObj={userObj} />
      <MyCogowits userObj={userObj} />
      <LogOutButton />
    </>
  );
}

export default Profile;
