import { useState, useEffect } from "react";
import Link from '@mui/material/Link';
import { Redirect, useParams } from "react-router-dom"
import axios from 'axios';
import { Box } from '@material-ui/core'
import loader from '../assets/loader.gif'

export default function AccountActivate() {
  const [loading, setLoading] = useState(true);
  const [isActivated, setIsActivated] = useState(false);
	const { token } = useParams();

  useEffect(async () => {
    try {
      let res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/activate/${token}`);

      setLoading(false);
      setIsActivated(true);
    } catch (err) {
      console.log(err);

      if (err.status === 404)
      {
        return (<Redirect push to="*" />)
      }
      setLoading(false);
      setIsActivated(false);
    }
  }, [])

  return (    
    <Box display="flex" flexDirection="column" alignItems="center">
      
      {
        loading ? <img src={loader} width="250" alt="Loading ..."/> : ""
      }
      <Box display={loading ? "none" : "flex"} flexDirection="column" alignItems="center">
        {
          isActivated ?
          <>
            <p>Your account has been activated!</p>
          </> :
          <>
          <p>Something went wrong! Please try again!</p>
        </>
        }
        <Link href="/" >Go Home</Link>
      </Box>
    </Box>
  );
}
