import './App.css';
import Home from './pages/Home'
import CourseDetail from './pages/CourseDetail'
import UserPage from './pages/UserPage'
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/:id" component={CourseDetail}></Route>
        <Route exact path="/users/:id" component={UserPage}></Route>
      </div>
    </Router>

  );
}

export default App;
