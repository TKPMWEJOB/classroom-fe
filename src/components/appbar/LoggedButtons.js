import * as React from 'react';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { useHistory } from 'react-router-dom'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';

export default function LoggedButtons({handleAvatarClick}) {
    const { userInfo, updateUser } = useContext(UserContext);
    const tokenLocal = JSON.parse(localStorage.getItem("token"))?.jwtToken;
    const history = useHistory();
    
    const handleSignout = async () => {
    let config = null;
    if (tokenLocal) {
        config = {
            headers: { 'authorization': `${tokenLocal}` }
        };
    }
    let response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/logout`, config);
    console.log(response);
    updateUser(false, null);
    history.push('/');
    //removeCookie("token");
    //window.location.reload();
    };

    return (
    <Box sx={{display: "flex",flexDirection: "row"}}>
        <Avatar alt={userInfo.info?.email} src="./user.png" onClick={handleAvatarClick}/>
        <Button color="inherit" onClick={handleSignout}>Sign out</Button>
    </Box>
    );
}
