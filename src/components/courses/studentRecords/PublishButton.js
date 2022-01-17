import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ITEM_HEIGHT = 48;

export default function ButtonMenu({OnClickPublish, className, params, draftData, gradeStructure}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isPublish, setIsPublish] = React.useState(false);
  const open = Boolean(anchorEl);

  
  const handleClick = (event) => {
    const numGrade = gradeStructure.length;
    const colId = parseInt(params.field.replace('grade', ''));
    const rowId = parseInt(params.id);
    const dataId = rowId * numGrade + colId;
    setIsPublish(draftData[dataId]['StudentRecords.publish']);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickPublish = () => {
    handleClose();
    OnClickPublish();
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls="long-menu"
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        className={className}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {isPublish ? 
        <MenuItem  disabled={true}>Publish Grade</MenuItem>
        : <MenuItem  onClick={handleClickPublish}>Publish Grade</MenuItem> }
        
      </Menu>
    </div>
  );
}
//disabled={!isPublishActive}