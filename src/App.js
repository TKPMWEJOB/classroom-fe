import './App.css';
import Home from './pages/Home'
import CourseDetail from './pages/CourseDetail'
import UserPage from './pages/UserPage'
import InvitationComfirm from './pages/InvitationComfirm'
import NotFound from './pages/NotFoundPage'

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
          <Route exact path="/invitation/:id" component={InvitationComfirm}></Route>
          <Route path="*" component={NotFound} />
        </Switch>
      </UserContext.Provider>
    </main>
  );
}

export default App;
