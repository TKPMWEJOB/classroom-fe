import Collapse from '@mui/material/Collapse';
import React from 'react';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { Paper } from '@mui/material';
import InfoIcon from '@mui/icons-material/ErrorOutline';
import InfoIcon2 from '@mui/icons-material/Error';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(360deg)',

    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const styles = {
    container__banner: {
        borderRadius: '8px',
        overflow: 'hidden',
        margin: '24px 0px 24px 0px',
        position: 'relative'
    },
    banner: {
        height: 240,
        backgroundImage: `url(${"https://gstatic.com/classroom/themes/img_backtoschool.jpg"})`,
        backgroundSize: "cover",
        position: 'relative',
    },
    bannerTitle: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        padding: '16px 24px',
        color: 'white'
    },
    bannerTitle__h1__h2: {
        margin: '0px',
        display: 'plex',
        textAlign: 'left'
    },
    bannerTitle__h1: {
        fontWeight: '500',
        fontSize: '2.25rem'
    },
    bannerTitle__h2: {
        fontWeight: 'normal',
        fontSize: '1.375rem'
    },
    moreInfo: {
        position: 'absolute',
        backgroundColor: 'transparent',
        right: 0,
        bottom: 0
    },
    moreInfoButton: {
        color: 'white',
        backgroundColor: 'transparent',
        transform: 'rotate(180deg)'
    },
    expand: {
        fontFamily: 'sans-serif',
        fontSize: '14px',
        display: 'flex',
        padding: '24px',
        flexDirection: 'column',
        textAlign: 'left'
    },
    expand__label: {
        fontWeight: '700',
    }
};

export default function Banner({ course }) {
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Paper style={styles.container__banner}>
            <div style={styles.banner} >
                <div style={styles.bannerTitle}>
                    <h1 style={{ ...styles.bannerTitle__h1__h2, ...styles.bannerTitle__h1 }}>
                        {course.name}
                    </h1>
                    <h2 style={{ ...styles.bannerTitle__h1__h2, ...styles.bannerTitle__h2 }}>
                        {course.section}
                    </h2>

                </div>
                <ExpandMore
                    style={styles.moreInfo}
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    {expanded ?
                        <InfoIcon2 style={styles.moreInfoButton} variant='outlined'></InfoIcon2>
                        : <InfoIcon style={styles.moreInfoButton} variant='outlined'></InfoIcon>
                    }
                </ExpandMore>

            </div>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <div style={styles.expand}>
                    {course.subject ?
                        <div>
                            <label style={styles.expand__label}>
                                Subject&nbsp;
                            </label>
                            {course.subject}

                        </div>
                        : ""
                    }
                    {course.subject ?
                        <div>
                            <label style={styles.expand__label}>
                                Room&nbsp;
                            </label>
                            {course.room}
                        </div>
                        : ""
                    }
                </div>
            </Collapse>
        </Paper>
    )
}