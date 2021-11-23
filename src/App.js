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

function App() {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/courses" component={Home}></Route>
        <Route exact path="/courses/:id" component={CourseDetail}></Route>
        <Route exact path="/user" component={UserPage}></Route>
        <Route exact path="/invitation/:id" component={InvitationComfirm}></Route>
        <Route path="*" component={NotFound} />
      </Switch>
    </main>

  );
}

export default App;
