import CourseList from '../components/courses/CourseList'
import AppBar from '../components/appbar/AppBar'
import { UserContext } from '../contexts/UserContext';
import { useContext } from 'react';

export default function Home() {
  const { userInfo } = useContext(UserContext);

  //const [user, setUser] = useState(null);

  //const [cookies, setCookie] = useCookies();
  
//const token = JSON.parse(localStorage.getItem("token"));

  //console.log(get("token") ? "wtf" : "nothing");
  return (
    <div>
      <AppBar></AppBar>
      {userInfo.isLogin ? <CourseList></CourseList> : <h1>Welcome to classroom, please sign in!</h1> }
    </div>
  );
}
