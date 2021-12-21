import React, { useState, useEffect, useContext } from 'react';
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
import axios from "axios";

import { blue } from '@mui/material/colors';
import { useParams } from "react-router-dom";
import { UserContext } from '../../contexts/UserContext';


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

function OtherUserProfile() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState(null);
  const {userInfo, setUserInfo} = useContext(UserContext);
	const { id } = useParams();
  
  useEffect( async() => {
    try {
      let result = await axios.get(`${process.env.REACT_APP_API_URL}/user/${id}`);
      console.log(result);
      setUser(result.data);
      setIsLoaded(true);
    } catch(error) {
      setIsLoaded(true);
      setError(error);
    }
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {

    let birthday = '';
    if (user.birthday !== null) {
      let date_ob = new Date(user.birthday);
      let date = ("0" + date_ob.getDate()).slice(-2);
      let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
      let year = date_ob.getFullYear();
      birthday = date + '/' + month + '/' + year;
    }
    

    let fullname = user.lastName + ' ' + user.firstName;

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
                          {user.studentID}
                        </span>
                      </Grid>
                    </Item>
                  </Grid>
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
                    {birthday? birthday : 'Not set'}
                    </span>
                    <span className='font-size-m ml-20 mb-40'>
                    {user.gender? user.gender : 'Not set'}
                    </span>
                    <span className='font-size-m ml-20 mb-40'>
                    {user.address? user.address : 'Not set'}
                    </span>
                    <span className='font-size-m ml-20 mb-40'>
                    {user.phone? user.phone : 'Not set'}
                    </span>
                    <span className='font-size-m ml-20 mb-40'>
                    {user.email? user.email : 'Not set'}
                    </span>
                    <span className='font-size-m ml-20 mb-40'>
                    {user.school? user.school : 'Not set'}
                    </span>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Card>
          </Box>
      </ThemeProvider>
    );
  };
}
  
export default OtherUserProfile;