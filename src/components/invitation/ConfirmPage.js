import React, { useState, useEffect } from 'react';

import {
  Grid,
  Button ,
  styled,
  Box,
  Stack ,
  Typography,
  Link,
  Container 
} from '@material-ui/core';

import ConfirmPageContent from './PageContent';
import SigninDialog from './authentication/SigninDialog';
import SignupDialog from './authentication/SignupDialog';


export default function ComfirmPage() {
    const [openSignin, setOpenSignin] = React.useState(false);
    const [openSignup, setOpenSignup] = React.useState(false);
    const [content, setContent] = useState([]);
    const token = JSON.parse(localStorage.getItem("token"));

    const handleCreateSignin = () => {
        setOpenSignin(true);
        setOpenSignup(false);
    };
    
    const handleCloseSignin = () => {
        setOpenSignin(false);
    };

    const handleCreateSignup = () => {
        setOpenSignup(true);
        setOpenSignin(false);
    };

    const handleCloseSignup = () => {
        setOpenSignup(false);
    };

    const handleAcceptInv = () => {

    }

    
    if (token) {
        const newContent = {
            title: 'Almost Done!',
            description: 'Click the button below to access to your class!',
            buttonLabel: 'Accept Invitation'
        }
        setContent(newContent);
    }
    else {
        const newContent = {
            title: 'You need an account to join the class',
            description: 'Click the button below to login',
            buttonLabel: 'Signin'
        }
        setContent(newContent);
    }

    return (
    <main>
        <SigninDialog open={openSignin}
            handleClose={handleCloseSignin}
            handleCreateSignup={handleCreateSignup}
            dialogTitle="Sign In"
        />
        <SignupDialog open={openSignup}
            handleClose={handleCloseSignup}
            dialogTitle="Sign Up"
        />
        <Box
        sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
        }}
        >
        {token? <ConfirmPageContent content={content} onClick={handleAcceptInv} /> : <ConfirmPageContent content={content} onClick={handleCreateSignin} />}
        </Box>
    </main>
        
    );
  }