import { Typography } from '@mui/material';
import { Container } from './widget.styles';

const WidgetContainer = ({ title, children }) => {
  return (
    <Container>
      <Typography mb={3} variant="h5" color="secondary">
        {title}
      </Typography>
      {children}
    </Container>
  );
};

export default WidgetContainer;
