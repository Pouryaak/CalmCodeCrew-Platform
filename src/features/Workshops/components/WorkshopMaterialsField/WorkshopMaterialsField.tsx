import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// import { useState } from 'react';
import CircularButton from '../../../../shared/components/CircularButton/CircularButton';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import TextField from '@mui/material/TextField';
import { Material } from '../../models';
import { FormikProps } from 'formik';

interface WorkshopMaterialsFieldProps {
  materials: Material[];
  setMaterials: (materials: Material[]) => void;
  formik: FormikProps<any>;
}

const WorkshopMaterialsField: React.FC<WorkshopMaterialsFieldProps> = ({
  materials,
  setMaterials,
  formik,
}) => {
  //   const [materials, setMaterials] = useState([]);

  const handleAddMaterial = () => {
    setMaterials([...materials, { name: '', link: '', description: '' }]);
  };

  // Function to handle deleting a material row
  const handleDeleteMaterial = (index) => {
    // inform the formik to make the field untouched because it's getting removed
    formik.setFieldTouched(`materials[${index}].name`, false, false);
    setMaterials(materials.filter((_, i) => i !== index));
  };

  // Function to swap materials to handle ordering
  const handleMove = (currentIndex, direction) => {
    const targetIndex =
      direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= materials.length) return; // Out of bounds check

    const newMaterials = [...materials];
    const temp = newMaterials[currentIndex];
    newMaterials[currentIndex] = newMaterials[targetIndex];
    newMaterials[targetIndex] = temp;

    setMaterials(newMaterials);
  };

  // Function to handle material field change
  const handleChange = (index, field, value) => {
    const updatedMaterials = materials.map((item, i) =>
      i === index ? { ...item, [field]: value } : item,
    );

    // inform formik about the field getting touched
    formik.setFieldTouched(`materials[${index}].${field}`, true, false);

    setMaterials(updatedMaterials);
  };

  return (
    <Box mb={2}>
      <Box display="flex" alignItems="center" gap={2}>
        <Typography gutterBottom variant="h6">
          Materials List
        </Typography>
        <CircularButton onClick={handleAddMaterial} Icon={AddIcon} />
      </Box>
      {materials.map((material, index) => (
        <Box key={index} display="flex" alignItems="center" gap={2} mb={1}>
          <TextField
            name={`materials.${index}.name`}
            label="Name"
            value={material.name}
            onChange={(e) => handleChange(index, 'name', e.target.value)}
            fullWidth
            margin="dense"
            error={
              // it will give error if all these conditions are not in place
              // TODO: make it better?
              formik.touched.materials &&
              formik.touched.materials[index] &&
              formik.touched.materials[index]?.name &&
              formik.errors.materials &&
              formik.errors?.materials[index] &&
              Boolean(formik.errors?.materials[index]?.name)
            }
            helperText={
              // it will give error if all these conditions are not in place
              // TODO: make it better?
              formik.touched.materials &&
              formik.touched.materials[index] &&
              formik.touched.materials[index]?.name &&
              formik.errors.materials &&
              formik.errors?.materials[index] &&
              formik.errors?.materials[index]?.name
            }
          />
          <TextField
            name={`materials.${index}.link`}
            label="Link"
            value={material.link}
            onChange={(e) => handleChange(index, 'link', e.target.value)}
            fullWidth
            margin="dense"
          />
          <TextField
            name={`materials.${index}.description`}
            label="Description"
            value={material.description}
            onChange={(e) => handleChange(index, 'description', e.target.value)}
            fullWidth
            margin="dense"
          />
          <IconButton
            onClick={() => handleMove(index, 'up')}
            disabled={index === 0}
          >
            <ArrowUpwardIcon />
          </IconButton>
          <IconButton
            onClick={() => handleMove(index, 'down')}
            disabled={index === materials.length - 1}
          >
            <ArrowDownwardIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteMaterial(index)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}
      {materials.length == 0 && (
        <Typography fontStyle="italic">
          No materials have been added ( Click on + to add )
        </Typography>
      )}
    </Box>
  );
};

export default WorkshopMaterialsField;
