import { Redirect } from "react-router-dom"
import AppBar from '../components/appbar/AppBar'
import UserProfile from '../components/users/UserProfile'
import { Box } from '@material-ui/core'
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function UserDetail() {
  const {userInfo } = useContext(UserContext);

  return (    
    <Box sx={{ bgcolor: '#F8F8F8' }}>
      <AppBar></AppBar>
      {userInfo.isLogin ? <UserProfile/> : <Redirect to="/" /> }
    </Box>
  );
}
