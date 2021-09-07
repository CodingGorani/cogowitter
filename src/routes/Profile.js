import ProfileForm from 'components/ProfileForm';
import LogOutButton from 'components/LogOutButton';
import MyCogowits from 'components/MyCogowits';

function Profile({ refreshUser, userObj }) {
  return (
    <>
      <ProfileForm refreshUser={refreshUser} userObj={userObj} />
      <MyCogowits userObj={userObj} />
      <LogOutButton />
    </>
  );
}

export default Profile;
