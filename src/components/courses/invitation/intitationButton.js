import React from 'react';

import {
  Grid,
  styled,
  Button
} from '@material-ui/core';


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