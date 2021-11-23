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


export default function Album() {
    return (
    <main>
        <Box
        sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
        }}
        >
        <Container maxWidth="sm">
            <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
            >
            Almost Done!
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
            Click the button below to access to your class!
            </Typography>
            <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
            >
            <Button variant="contained">Accept Invitation</Button>
            </Stack>
        </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
            {cards.map((card) => (
            <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                <CardMedia
                    component="img"
                    sx={{
                    // 16:9
                    pt: '56.25%',
                    }}
                    image="https://source.unsplash.com/random"
                    alt="random"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                    Heading
                    </Typography>
                    <Typography>
                    This is a media card. You can use this section to describe the
                    content.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Edit</Button>
                </CardActions>
                </Card>
            </Grid>
            ))}
        </Grid>
        </Container>
    </main>
        
    );
  }