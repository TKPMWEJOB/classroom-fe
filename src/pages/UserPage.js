import * as React from 'react'
import { Redirect } from "react-router-dom"
import AppBar from '../components/courses/detail/DetailAppBar'
import UserProfile from '../components/users/UserProfile'
import { Box } from '@material-ui/core'

export default function CourseDetail() {
  const token = JSON.parse(localStorage.getItem("token"));
  return (    
    <Box sx={{ bgcolor: '#F8F8F8' }}>
      <AppBar></AppBar>
      {token ? <UserProfile/> : <Redirect to="/" /> }
    </Box>
  );
}
