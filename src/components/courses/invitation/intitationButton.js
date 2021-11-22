import React from 'react';
import { useState } from 'react';

import {
  Grid,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  styled,
  Button
} from '@material-ui/core';

import LoadingButton from '@mui/lab/LoadingButton';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Item = styled('div')({
  padding: 20,
  display: 'block',
});

function invitationButton() {


  return (
    <>
      <Grid item xs={1} md={3}>
        <Item>
          <div className='text-right'>
            <Button
            className="m-2"
            variant="outlined"
            color="primary">
            Invite
            </Button>
          </div>
        </Item>
      </Grid>
    </>
  );
}
  
export default invitationButton;