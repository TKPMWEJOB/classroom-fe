import CourseList from '../components/courses/CourseList'
import AppBar from '../components/appbar/AppBar'
import WelcomeScreen from '../components/WelcomeScreen'
import { UserContext } from '../contexts/UserContext';
import { useContext } from 'react';

export default function Home() {
  const { userInfo } = useContext(UserContext);
  return (
    <div>
      <AppBar></AppBar>
      {userInfo.isLogin ? <CourseList></CourseList> : <WelcomeScreen /> }
    </div>
  );
}
