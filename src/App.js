import './App.css';
import Home from './pages/Home'
import CourseDetail from './pages/CourseDetail'
import UserPage from './pages/UserPage'
import {
  Route,
  Switch
} from "react-router-dom";
import { UserContext } from './contexts/UserContext';
import { useState } from 'react';

function App() {
  const localUser = JSON.parse(localStorage.getItem("user"));
  const [userInfo, setUserInfo] = useState({
    isLogin: localUser?.isLogin,
    info: localUser?.info,
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
    <main>
      <UserContext.Provider value={{userInfo, updateUser}}>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/courses" component={Home}></Route>
          <Route exact path="/courses/:id" component={CourseDetail}></Route>
          <Route exact path="/user" component={UserPage}></Route>
        </Switch>
      </UserContext.Provider>
    </main>
  );
}

export default App;
