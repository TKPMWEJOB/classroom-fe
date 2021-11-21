import './App.css';
import Home from './pages/Home'
import CourseDetail from './pages/CourseDetail'
import UserPage from './pages/UserPage'
import {
  Route,
  Switch
} from "react-router-dom";

function App() {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/courses" component={Home}></Route>
        <Route exact path="/courses/:id" component={CourseDetail}></Route>
        <Route exact path="/user" component={UserPage}></Route>
      </Switch>
    </main>

  );
}

export default App;
