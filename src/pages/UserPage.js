import { Redirect } from "react-router-dom"
import AppBar from '../components/AppBar'
import UserProfile from '../components/users/UserProfile'
import { Box } from '@material-ui/core'

export default function UserPage() {
  const token = JSON.parse(localStorage.getItem("token"));
  return (    
    <Box sx={{ bgcolor: '#F8F8F8' }}>
      <AppBar></AppBar>
      {token ? <UserProfile/> : <Redirect to="/" /> }
    </Box>
  );
}
