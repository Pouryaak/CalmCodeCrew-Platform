import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// import { useState } from 'react';
import CircularButton from '../../../../shared/components/CircularButton/CircularButton';

const WorkshopMaterialsField = () => {
  //   const [materials, setMaterials] = useState([]);

  return (
    <Box mb={2}>
      <Box display="flex" alignItems="center" gap={2}>
        <Typography gutterBottom variant="h6">
          Materials List
        </Typography>
        <CircularButton onClick={() => {}} Icon={AddIcon} />
      </Box>
    </Box>
  );
};

export default WorkshopMaterialsField;
