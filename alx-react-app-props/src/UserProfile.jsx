import { useContext } from 'react';
import UserContext from './components/UserContext';
import UserDetails from './components/UserDetails';

function UserProfile() {
  const userData = useContext(UserContext);

  return <UserDetails userData={userData} />;
}

export default UserProfile;
