import { useState } from 'react';
import { Block, Container, LeftBlock } from './AuthenticationPage.styles';
import Logo from '../../assets/calmcodecrew.png';
import { Button, Typography } from '@mui/material';
import { Tab } from './models';
import Login from '../../features/Authentication/Login/Login';
import Register from '../../features/Authentication/Register/Register';

const AuthenticationPage = () => {
  const [tab, setTab] = useState(Tab.REGISTER);

  return (
    <Container>
      <LeftBlock>
        <img src={Logo} alt="" width={150} />
        <Typography sx={{ py: 3, textAlign: 'center' }} variant="h4">
          Welcome To CalmCodeCrew!
        </Typography>
        <Button
          size="large"
          variant="contained"
          onClick={() =>
            setTab(tab === Tab.REGISTER ? Tab.LOGIN : Tab.REGISTER)
          }
        >
          {tab}
        </Button>
      </LeftBlock>
      <Block>{tab === Tab.REGISTER ? <Login /> : <Register />}</Block>
    </Container>
  );
};

export default AuthenticationPage;
