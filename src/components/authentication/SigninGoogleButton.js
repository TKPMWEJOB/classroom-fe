import * as React from 'react';
import { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../contexts/UserContext';
import { GoogleLogin } from 'react-google-login'

axios.defaults.withCredentials = true;
export default function SigninGoogleButton({ handleSetMsgSnack, handleOpenSuccessSnack, handleOpenErrorSnack, handleClose }) {
    const { updateUser } = useContext(UserContext);

    const handleLogin = async (googleData) => {
        try {
            console.log(googleData);
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/google`, { token: googleData.tokenId });

            handleSetMsgSnack(response.data.msg);
            handleOpenSuccessSnack();

            setTimeout(() => {
                handleClose();
                updateUser(true, response.data.body);
            }, 1500);
        } catch (error) {
            console.log(error.response);
            handleSetMsgSnack(error.response.data.msg);
            handleOpenErrorSnack();
        }
    };

    const handleFailure = async (googleData) => {
        console.log(googleData);
        handleSetMsgSnack(googleData.error);
        handleOpenErrorSnack();
    };

    return (
        <div style={{ width: '50%', margin: 'auto' }}>
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
