import { Box, Button, Typography } from '@mui/material';

const WorkshopCard = ({ image, title }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        borderRadius: '10px',
        width: 265,
        height: 265,
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 2,
        '&:before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage:
            'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.80) 70%)',
          zIndex: 1,
        },
        '& > *': {
          position: 'relative',
          zIndex: 2,
        },
      }}
    >
      <Typography variant="h5" gutterBottom color="common.white">
        {title}
      </Typography>
      <Button variant="outlined" color="primary">
        Read More
      </Button>
    </Box>
  );
};

export default WorkshopCard;
