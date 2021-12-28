// material
import { Box, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import {useState, useEffect} from 'react';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem('user'));
    setUserName(user.name+' '+user.surname);
    setEmail(user.email);
  }, [userName, email]);
  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome {userName}</Typography>
        </Box>
      </Container>
    </Page>
  );
}
