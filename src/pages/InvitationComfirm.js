import { Redirect } from "react-router-dom"
import AppBar from '../components/AppBar'
import ComfirmPage from '../components/invitation/ConfirmPage'
import { Box } from '@material-ui/core'

export default function ComfirmPage() {
  return (    
    <Box sx={{ bgcolor: '#F8F8F8' }}>
      <AppBar></AppBar>
      <ComfirmPage/>
    </Box>
  );
}
