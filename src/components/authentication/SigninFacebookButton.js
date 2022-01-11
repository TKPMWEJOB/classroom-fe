import * as React from 'react';
import { useState, useContext } from 'react';
import axios from 'axios';
import FacebookLogin from 'react-facebook-login';
import { UserContext } from '../../contexts/UserContext';
import { SnackbarContext } from '../../contexts/SnackbarContext';

axios.defaults.withCredentials = true;
export default function SigninFacebookButton({ handleClose }) {
    const { updateUser } = useContext(UserContext);
    const { handleOpenErrorSnack, handleOpenSuccessSnack, handleSetMsgSnack } = useContext(SnackbarContext);

    const handleLogin = async (data) => {
        try {
            console.log(data);
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/facebook`, { 
                token: data.accessToken,
                email: data.email,
                firstName: data.first_name,
                lastName: data.last_name,
            });

            handleSetMsgSnack(response.data.msg);
            handleOpenSuccessSnack(true);

            setTimeout(() => {
                handleClose();
                updateUser(true, response.data.body);
            }, 1500);
        } catch (error) {
            console.log(error.response);
            handleSetMsgSnack(error.response.data.msg);
            handleOpenErrorSnack(true);
        }
    };

    const handleFailure = async (facebookData) => {
        console.log(facebookData);
        handleSetMsgSnack(facebookData.error);
        handleOpenErrorSnack(true);
    };

    return (
        <div style={{ marginTop: '10px' }}>
            <FacebookLogin
                appId={process.env.REACT_APP_FACEBOOK_CLIENT_ID}
                buttonText="Login with Facebook"
                autoLoad={false}
                fields="name,email,first_name,last_name"
                scope="public_profile,email,user_birthday"
                callback={handleLogin}
                onFailure={handleFailure}
                returnScopes="true"
                icon="fa-facebook"
            />
        </div>
    );
}
