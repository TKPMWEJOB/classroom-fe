import CourseList from '../components/courses/CourseList'
import AppBar from '../components/AppBar'

export default function Home() {
  //const [user, setUser] = useState(null);
  
const token = JSON.parse(localStorage.getItem("token"));
/*
  useEffect(() => {
    window.addEventListener('storage', () => {
      setUser(JSON.parse(localStorage.getItem("token")));
    });
  }, [])

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("token")));
  }, [user])
*/
  return (
    <div>
      <AppBar></AppBar>
      {token ? <CourseList></CourseList> : <h1>Welcome to classroom, please sign in!</h1> }
    </div>
  );
}
