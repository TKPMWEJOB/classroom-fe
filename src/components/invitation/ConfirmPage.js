import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom'

import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import axios from 'axios';

import ConfirmPageContent from './PageContent';
import SigninDialog from '../authentication/SigninDialog';
import SignupDialog from '../authentication/SignupDialog';
import NotFound from '../../pages/NotFoundPage'

export default function ComfirmPage() {
    const [openSignin, setOpenSignin] = React.useState(false);
    const [openSignup, setOpenSignup] = React.useState(false);
    const [openErrorSnack, setOpenErrorSnack] = useState(false);
    const [openSuccessSnack, setOpenSuccessSnack] = useState(false);
    const [snackMsg, setSnackMsg] = useState("");
    const [content, setContent] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);  
    const [isJoined, setIsJoined] = useState(false);  
    const [user, setUser] = useState(null);
    const token = JSON.parse(localStorage.getItem("token"));
    const invitationId  = useParams();
    const history = useHistory();
    const tokenLocal = JSON.parse(localStorage.getItem("token"))?.jwtToken;

    useEffect(() => { 
        let config = null;
        if (tokenLocal) {
            config = {
                headers: { 'authorization': `${tokenLocal}` }
            };
        }

        axios.get(`${process.env.REACT_APP_API_URL}/user/find-user/${invitationId.id}`, config)
        .then(res => {
            /*setSnackMsg(res.data.msg);  
            setOpenSuccessSnack(true);
            setLoading(false);*/
            console.log(res.status);
            console.log(res);
            setIsLoaded(true);
            
            if (res.status === 201) {
                setUser(res.data);
                const newContent = {
                    title: 'Almost Done!',
                    description: 'Click the button below to access to your class!',
                    buttonLabel: 'Accept Invitation'
                }
                setContent(newContent);
            }
            else if (res.status === 202) {
                const newContent = {
                    title: 'You have already joined!',
                    description: 'Click the button below to access to your class!',
                    buttonLabel: 'Go to classroom'
                }
                console.log(newContent);
                setContent(newContent);
                setIsJoined(true);
            }
            else if (res.status === 203) {
                const newContent = {
                    title: 'You need an account to join the class',
                    description: 'Click the button below to login',
                    buttonLabel: 'Signin'
                }
                console.log(newContent);
                setContent(newContent);
            }
        })
        .catch( 
            error => {
                console.log(error.response.status);
                if (error.response.status === 202 ) {
                    
                }
                else {
                    setIsLoaded(true);
                    setError(error);
                }
            }      
        );
    }, []); 

    const handleCloseErrorSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
  
        setOpenErrorSnack(false);
    };
  
    const handleCloseSuccessSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
  
        setOpenSuccessSnack(false);
    };

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
        const data = {
            invitationId: invitationId.id,
            userId: user.id
        }
        const config = {
            headers: { 'authorization': `${tokenLocal}` }
        };
        axios.put(`${process.env.REACT_APP_API_URL}/courses/student-accepted`, data, config)
        .then(res => {
            setSnackMsg(res.data.msg);
            setOpenSuccessSnack(true);
            setIsLoaded(true);
            history.push(`/courses/${res.data.courseId}`);
        })
        .catch( 
        error => {
            setSnackMsg(error.response.data.msg);
            setOpenErrorSnack(true);
            setIsLoaded(true);
        }      
        );
    }

    const handleGotoClass = () => {
        history.push(`/courses/${invitationId.id}`);
    };


    if (error) {
        return <NotFound />;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } 
    else {
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
            {isJoined? <ConfirmPageContent content={content} onClick={handleGotoClass} /> : 
                token? <ConfirmPageContent content={content} onClick={handleAcceptInv} /> : 
                <ConfirmPageContent content={content} onClick={handleCreateSignin} />
            }
            </Box>
            <Snackbar open={openErrorSnack} autoHideDuration={4000} onClose={handleCloseErrorSnack}>
                <MuiAlert 
                    elevation={6} variant="filled" onClose={handleCloseErrorSnack} severity="error" sx={{ width: '100%' }} 
                > 
                    {snackMsg}
                </MuiAlert>
            </Snackbar>
            <Snackbar open={openSuccessSnack} autoHideDuration={4000} onClose={handleCloseSuccessSnack}>
                <MuiAlert 
                    elevation={6} variant="filled" onClose={handleCloseSuccessSnack} severity="success" sx={{ width: '100%' }} 
                > 
                    {snackMsg}
                </MuiAlert>
            </Snackbar>
        </main>
            
        );
    }
  }