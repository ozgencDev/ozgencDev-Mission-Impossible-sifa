// material
import { Box, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import {useState, useEffect} from 'react';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const [userName, setUserName] = useState(); //set state to user name
  const [email, setEmail] = useState(); //set state to user email

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem('user')); //get user data from local storage
    setUserName(user.name+' '+user.surname); //set user name
    setEmail(user.email); //set user email
  }, [userName, email]); 
  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome {userName}</Typography>
        </Box>
        <Box sx={{ pb: 12 }} style={{marginLeft: 64}}>
           <img src="/static/illustrations/1.png" alt="login" />
        </Box>
      </Container>
    </Page>
  );
}
