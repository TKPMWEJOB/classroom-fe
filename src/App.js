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
import { SnackbarContext } from './contexts/SnackbarContext';
import { useState } from 'react';
import SnackBars from './components/snackbars/SnackBars';

function App() {
  const localUser = JSON.parse(localStorage.getItem("user"));
  const [userInfo, setUserInfo] = useState({
    isLogin: localUser?.isLogin,
    info: localUser?.info,
  });

  const [openErrorSnack, setOpenErrorSnack] = useState(false);
  const [openSuccessSnack, setOpenSuccessSnack] = useState(false);
  const [SnackMsg, setSnackMsg] = useState("");

  function updateUser(isLogin, info) {
    let newUser = {
      isLogin,
      info,
    };
    setUserInfo(newUser);
    console.log(isLogin, info);
    localStorage.setItem("user", JSON.stringify(newUser));
  }

  const handleOpenErrorSnack = (isOpen) => {
    setOpenErrorSnack(isOpen);
  };

  const handleOpenSuccessSnack = (isOpen) => {
    setOpenSuccessSnack(isOpen);
  };
  
  const handleSetMsgSnack = (msg) => {
    setSnackMsg(msg);
  }

  return (
    <main>
      <SnackbarContext.Provider value={{ handleOpenErrorSnack, handleOpenSuccessSnack, handleSetMsgSnack }} >
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
      </SnackbarContext.Provider>

      <SnackBars 
        openErrorSnack={openErrorSnack} 
        openSuccessSnack={openSuccessSnack} 
        SnackMsg={SnackMsg} 
        setOpenErrorSnack={setOpenErrorSnack} 
        setOpenSuccessSnack={setOpenSuccessSnack}
      />
    </main>
  );
}

export default App;
