import React, { useState, useEffect } from 'react';
import '../../assets/css/style.css';

import {
  Grid,
  Card,
  styled,
  Box,
  createTheme,
  ThemeProvider
} from '@material-ui/core';

import CakeIcon from '@mui/icons-material/Cake';
import WcIcon from '@mui/icons-material/Wc';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import SchoolIcon from '@mui/icons-material/School';

import NameEditBtn from './UserNameEdit';
import InfoEditBtn from './UserInfoEdit';

import { blue } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: blue[700],
    },
    secondary: {
      main: '#828282',
    }
  },
});

const Item = styled('div')({
  padding: 20,
  display: 'block',
});

const Avatar = styled('img')({
  marginTop: 'auto',
  marginBottom: 'auto',
  marginLeft: '60px',
  display: 'flex',
  maxWidth: '100px',
  maxHeight: '100px',
  borderRadius: '50%',
});

function UserProfile() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users`)
      .then(res => {
        if (res.status === 200) {
          return res.json();
        }
        else {
          return res.text().then(text => { throw new Error(text) })
        }
      })
      .then(
        (result) => {
          setIsLoaded(true);
          setUser(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, []);

  let date_ob = new Date(user.birthday);
  let date = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();
  let birthday = date + '/' + month + '/' + year;

  let fullname = user.lastname + ' ' + user.firstname;

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ height: '100vh', m: 8 }}>
          <Card >
            <Grid container spacing={2}>
              <Grid item xs={6} md={3}>
                <Item>
                  <Avatar alt="Avatar" src="https://stickershop.line-scdn.net/stickershop/v1/product/3065/LINEStorePC/main.png;compress=true" />
                </Item>
              </Grid>
              <Grid item sm container xs={6} md={9}>
                <Grid item xs container direction="row" spacing={2}>
                  <Grid item xs={5} md={9}>
                    <Item>
                      <Grid item xs container direction="column" spacing={2}>
                        <b className='font-size-xxl mb-10'>
                          {fullname}
                        </b>
                        <span className='font-size-m color-text-black-50'>
                          {user.studentid}
                        </span>
                      </Grid>
                    </Item>
                  </Grid>
                  <NameEditBtn setUserInfo={setUser} setIsLoaded={setIsLoaded} setError={setError} userInfo={user}/>
                </Grid>
              </Grid>
            </Grid>
            <Box marginTop={2}>
              <Grid container spacing={2} >
                <Grid item xs={6} md={3}>
                  <Item>
                    <b className='font-size-l ml-60 display-block'>
                      Personal Detail
                    </b>
                  </Item>
                </Grid>
              </Grid>
            </Box>
            
            <Grid container spacing={2}>
              <Grid item container direction="column" xs={6} md={3}>
                <Grid item container direction="row">                  
                    <CakeIcon className='ml-80 mb-30'/>
                    <span className='font-size-m mc-20 color-text-black-50 mb-30'>
                      Birthday
                    </span> 
                </Grid>
                <Grid item container direction="row">                  
                    <WcIcon className='ml-80 mb-30'/>
                    <span className='font-size-m mc-20 color-text-black-50 mb-30'>
                      Gender
                    </span> 
                </Grid>
                <Grid item container direction="row">                  
                    <HomeIcon className='ml-80 mb-30'/>
                    <span className='font-size-m mc-20 color-text-black-50 mb-30'>
                      Address
                    </span> 
                </Grid>
                <Grid item container direction="row">                  
                    <PhoneAndroidIcon className='ml-80 mb-30'/>
                    <span className='font-size-m mc-20 color-text-black-50 mb-30'>
                      Phone
                    </span> 
                </Grid>
                <Grid item container direction="row">                  
                    <EmailIcon className='ml-80 mb-30'/>
                    <span className='font-size-m mc-20 color-text-black-50 mb-30'>
                      Email
                    </span> 
                </Grid>
                <Grid item container direction="row">                  
                    <SchoolIcon className='ml-80 mb-30'/>
                    <span className='font-size-m mc-20 color-text-black-50 mb-30'>
                      School
                    </span> 
                </Grid>
              </Grid>
              <Grid item sm container xs={6} md={9}>
                <Grid item xs container direction="row" spacing={2}>
                  <Grid item container direction="column"  xs={5} md={9}>
                    <span className='font-size-m ml-20 mb-40 mt-5'>
                    {birthday}
                    </span>
                    <span className='font-size-m ml-20 mb-40'>
                    {user.gender}
                    </span>
                    <span className='font-size-m ml-20 mb-40'>
                    {user.address}
                    </span>
                    <span className='font-size-m ml-20 mb-40'>
                    {user.phone}
                    </span>
                    <span className='font-size-m ml-20 mb-40'>
                    {user.email}
                    </span>
                    <span className='font-size-m ml-20 mb-40'>
                    {user.school}
                    </span>
                  </Grid>
                  <InfoEditBtn setUserInfo={setUser} setIsLoaded={setIsLoaded} setError={setError} userInfo={user}/>
                </Grid>
              </Grid>
            </Grid>
          </Card>
          </Box>
      </ThemeProvider>
    );
  };
}
  
export default UserProfile;