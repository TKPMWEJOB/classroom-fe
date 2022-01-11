import * as React from 'react';
import { useState, useContext } from 'react';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login'
import { SnackbarContext } from '../../contexts/SnackbarContext';
import { UserContext } from '../../contexts/UserContext';

axios.defaults.withCredentials = true;
export default function SigninGoogleButton({ handleClose }) {
    const { updateUser } = useContext(UserContext);
    const { handleOpenErrorSnack, handleOpenSuccessSnack, handleSetMsgSnack } = useContext(SnackbarContext);

    const handleLogin = async (googleData) => {
        try {
            console.log(googleData);
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/google`, { token: googleData.tokenId });

            handleSetMsgSnack(response.data.msg);
            handleOpenSuccessSnack(true);

            setTimeout(() => {
                handleClose(true);
                updateUser(true, response.data.body);
            }, 1500);
        } catch (error) {
            console.log(error.response);
            handleSetMsgSnack(error.response.data.msg);
            handleOpenErrorSnack(true);
        }
    };

    const handleFailure = async (googleData) => {
        console.log(googleData);
        handleSetMsgSnack(googleData.error);
        handleOpenErrorSnack(true);
    };

    return (
        <div sx={{marginTop: '10px'}}>
            <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Login with Google"
                onSuccess={handleLogin}
                onFailure={handleFailure}
                cookiePolicy={'single_host_origin'}
                autoLoad={false}
            />
        </div>
    );
}
