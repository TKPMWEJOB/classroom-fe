import React, { useState, useEffect } from 'react';

import {
  Button,
  Typography,
  Container 
} from '@material-ui/core';

import Stack from '@mui/material/Stack';

export default function PageContent({ content, onClick }) {
    return (
    <main>
        <Container maxWidth="sm">
            <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
            >
            {content.title}
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
            {content.description}
            </Typography>
            <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
            >
            <Button variant="contained" onClick={onClick}>{content.buttonLabel}</Button>
            </Stack>
        </Container>
    </main>
    );
  }