import { useFormik } from 'formik';
import * as Yup from 'yup';
import { WorkshopStatus } from '../../models';
import { useCallback } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import StudentsListField from '../StudentsListField/StudentsListField';
import PageHeader from '../../../../shared/components/PageHeader/PageHeader';
import SaveIcon from '@mui/icons-material/Save';
import WorkshopMaterialsField from '../WorkshopMaterialsField/WorkshopMaterialsField';
import { addNewWorkshop } from '../../slice/workshop.slice';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../routes/default_routes';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, store } from '../../../../store/store';
import { STORE_STATUS } from '../../../../shared/models';

const workshopSchema = Yup.object().shape({
  uid: Yup.string().notRequired(), // Assuming it's a required field when submitting the form
  name: Yup.string()
    .required('Workshop name is required')
    .min(3, 'Workshop name must be at least 3 characters long'),
  image: Yup.string().required('Workshop Banner Image URL is required'),
  description: Yup.string().required('Description is required'),
  materials: Yup.array().of(
    Yup.object()
      .shape({
        name: Yup.string().required('Material name is required'),
        link: Yup.string().url('Must be a valid URL').notRequired(),
        description: Yup.string().notRequired(),
      })
      .notRequired(),
  ),
  requirements: Yup.string().required('Workshop requirements are required'),
  date: Yup.date()
    .required('Workshop date is required')
    .min(new Date(), 'Date cannot be in the past'),
  time: Yup.string()
    .required('Workshop time is required')
    .matches(
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
      'Invalid time format, should be HH:mm',
    ),
  mentor: Yup.string().required('Mentor name is required'),
  duration: Yup.string().required('Workshop duration is required'),
  status: Yup.mixed()
    .oneOf(Object.values(WorkshopStatus), 'Invalid status')
    .required('Workshop status is required'),
  location: Yup.string().required('Workshop location is required'),
  students: Yup.array().of(Yup.string()), // If you need specific validation for student IDs or similar, add here
});

interface WorkshopDetailsFormProps {
  id?: string;
}

const WorkshopDetailsForm: React.FC<WorkshopDetailsFormProps> = ({ id }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<typeof store.dispatch>();
  const storeState = useSelector((state: RootState) => state.workshops.status);

  const formik = useFormik({
    // Updated initial values
    initialValues: {
      uid: '',
      name: '',
      image: '',
      description: '',
      materials: [],
      requirements: '',
      date: '',
      time: '',
      mentor: '',
      duration: '',
      status: WorkshopStatus.UPCOMING,
      location: '',
      students: [],
    },
    validationSchema: workshopSchema,
    onSubmit: async (values) => {
      console.log('Form values:', values);
      try {
        await dispatch(addNewWorkshop(values));
        if (storeState === STORE_STATUS.SUCCEEDED) {
          navigate(ROUTES.WORKSHOPS);
        }
      } catch (error) {
        console.error('Error registering:', error);
      }
    },
  });

  const handleStudentsChange = useCallback((students) => {
    formik.setFieldValue(
      'students',
      students.map((s) => s.uid),
    );
  }, []);

  const setMaterials = (materials) => {
    formik.setFieldValue('materials', materials);
  };

  return (
    <div>
      <PageHeader
        title={id ? 'Update Workshop' : 'Add New Workshop'}
        buttonOptions={{
          title: 'Save',
          onClick: formik.handleSubmit,
          Icon: SaveIcon,
          loading: storeState === STORE_STATUS.LOADING,
        }}
      />
      <form onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            '& > :not(style)': { m: 2, width: '30%' },
          }}
        >
          <TextField
            autoFocus
            id="name"
            name="name"
            label="Workshop Name"
            type="text"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            autoFocus
            id="mentor"
            name="mentor"
            label="Workshop Mentor"
            type="text"
            value={formik.values.mentor}
            onChange={formik.handleChange}
            error={formik.touched.mentor && Boolean(formik.errors.mentor)}
            helperText={formik.touched.mentor && formik.errors.mentor}
          />
          <TextField
            autoFocus
            id="location"
            name="location"
            label="Workshop Location"
            type="text"
            value={formik.values.location}
            onChange={formik.handleChange}
            error={formik.touched.location && Boolean(formik.errors.location)}
            helperText={formik.touched.location && formik.errors.location}
          />
        </Box>

        <Box
          sx={{
            '& > :not(style)': { m: 2, width: '30%' },
          }}
        >
          <TextField
            autoFocus
            id="date"
            name="date"
            label="Workshop Date"
            type="text"
            value={formik.values.date}
            onChange={formik.handleChange}
            error={formik.touched.date && Boolean(formik.errors.date)}
            helperText={formik.touched.date && formik.errors.date}
          />
          <TextField
            fullWidth
            autoFocus
            id="time"
            name="time"
            label="Workshop Time"
            type="text"
            value={formik.values.time}
            onChange={formik.handleChange}
            error={formik.touched.time && Boolean(formik.errors.time)}
            helperText={formik.touched.time && formik.errors.time}
          />

          <TextField
            autoFocus
            id="duration"
            name="duration"
            label="Workshop Duration (ex. 1h)"
            type="text"
            value={formik.values.duration}
            onChange={formik.handleChange}
            error={formik.touched.duration && Boolean(formik.errors.duration)}
            helperText={formik.touched.duration && formik.errors.duration}
          />
        </Box>
        <Box
          sx={{
            '& > :not(style)': { m: 2, width: '46.5%' },
          }}
        >
          <TextField
            id="description"
            name="description"
            label="Workshop Description"
            type="text"
            multiline
            rows={6}
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />
          <TextField
            id="requirements"
            name="requirements"
            label="Workshop Requirements"
            type="text"
            multiline
            rows={6}
            value={formik.values.requirements}
            onChange={formik.handleChange}
            error={
              formik.touched.requirements && Boolean(formik.errors.requirements)
            }
            helperText={
              formik.touched.requirements && formik.errors.requirements
            }
          />
        </Box>
        <Box
          sx={{
            '& > :not(style)': { m: 2, width: '46.5%' },
          }}
        >
          <TextField
            fullWidth
            autoFocus
            id="image"
            name="image"
            label="Workshop Banner Image URL"
            type="text"
            value={formik.values.image}
            onChange={formik.handleChange}
            error={formik.touched.image && Boolean(formik.errors.image)}
            helperText={formik.touched.image && formik.errors.image}
          />
          <FormControl fullWidth>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              id="status"
              name="status"
              value={formik.values.status}
              label="Status"
              onChange={formik.handleChange}
              error={formik.touched.status && Boolean(formik.errors.status)}
            >
              {Object.values(WorkshopStatus).map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
            {formik.touched.status && formik.errors.status && (
              <div style={{ color: 'red' }}>{formik.errors.status}</div>
            )}
          </FormControl>
        </Box>
        <Box sx={{ m: 2 }}>
          <StudentsListField onStudentsChange={handleStudentsChange} />
        </Box>
        <Box sx={{ m: 2 }}>
          <WorkshopMaterialsField
            materials={formik.values.materials}
            setMaterials={setMaterials}
            formik={formik}
          />
        </Box>
      </form>
    </div>
  );
};

export default WorkshopDetailsForm;
