import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import Logo from '../../assets/calmcodecrew.png';
import Login from '../../features/Authentication/Login/Login';
import Register from '../../features/Authentication/Register/Register';
import { Block, Container, LeftBlock } from './AuthenticationPage.styles';
import { Tab } from './models';

const AuthenticationPage = () => {
  const [tab, setTab] = useState(Tab.REGISTER);

  const handleTabSelection = () => {
    setTab(tab === Tab.REGISTER ? Tab.LOGIN : Tab.REGISTER);
  };

  return (
    <Container>
      <LeftBlock>
        <img src={Logo} alt="calmcodecrew-logo" width={150} />
        <Typography sx={{ py: 3, textAlign: 'center' }} variant="h4">
          Welcome To CalmCodeCrew!
        </Typography>
        <Button
          size="large"
          variant="contained"
          onClick={() => handleTabSelection()}
        >
          {tab}
        </Button>
      </LeftBlock>
      <Block>{tab === Tab.REGISTER ? <Login /> : <Register />}</Block>
    </Container>
  );
};

export default AuthenticationPage;
