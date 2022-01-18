import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import { Menu, MenuItem } from '@mui/material';

export default function PlusIconButton({handleCreateCourse, handleCreateJoin}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCreate = () => {
        setAnchorEl(null);
        handleCreateCourse();
    };

    const handleJoin = () => {
        setAnchorEl(null);
        handleCreateJoin();
    };

    return (
        <>
            <Tooltip title="Create or Join Class" arrow>
                <IconButton size="large" edge="start" color="inherit" aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={handleClick}>
                    <AddIcon />
                </IconButton>
            </Tooltip>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem onClick={handleCreate}>Create Class</MenuItem>
                <MenuItem onClick={handleJoin}>Join Class</MenuItem>
            </Menu>
        </>
    );
}
