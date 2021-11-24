import { Box } from '@mui/system';
import React from 'react';


const styles = {
    textStyle: {
        textAlign: 'center'
    }
};

export default class Home extends React.Component {
    render() {
        return (
            <Box >
                <h1 style={styles.textStyle}> Welcome to Moorssalc Elgoog Classroom! Please Sign in!</h1>
            </Box>
        )
    }
}