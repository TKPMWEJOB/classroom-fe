import './App.css';
import Home from './pages/Home'
import CourseDetail from './pages/CourseDetail'
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import { UserContext } from './contexts/UserContext';
import { useState } from 'react';

function App() {
  const localUser = localStorage.getItem("user");
  const [userInfo, setUserInfo] = useState({
    isLogin: localUser ? true : false,
    info: localUser ? JSON.parse(localUser) : null,
  });

  function updateUser(isLogin, info) {
    let newUser = {
      isLogin,
      info,
    };
    setUserInfo(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  }

  return (
    <UserContext.Provider value={{userInfo, updateUser}}>
      <Router>
        <div className="App">
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/:id" component={CourseDetail}></Route>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
