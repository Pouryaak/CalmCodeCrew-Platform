import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Container, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState, store } from '../../../store/store';
import { ROUTES } from '../../../routes/default_routes';
import { signUp, clearError } from '../authSlice';
import toast from 'react-hot-toast';

// Updated validation schema
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const Register = () => {
  const dispatch = useDispatch<typeof store.dispatch>();
  const navigation = useNavigate();
  const authStatus = useSelector((state: RootState) => state.auth.status);
  const authError = useSelector((state: RootState) => state.auth.error);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(clearError());
    formik.handleChange(event);
  };

  const formik = useFormik({
    // Updated initial values
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log('Form values:', values);
      try {
        await dispatch(signUp(values));
        if (authStatus === 'succeeded') {
          navigation(ROUTES.HOME);
        }
      } catch (error) {
        console.error('Error registering:', error);
      }
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Register
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        {/* New TextField for name */}
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Name"
          margin="normal"
          variant="outlined"
          value={formik.values.name}
          onChange={handleInputChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email Address"
          margin="normal"
          variant="outlined"
          value={formik.values.email}
          onChange={handleInputChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          margin="normal"
          variant="outlined"
          value={formik.values.password}
          onChange={handleInputChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        {authError && <Typography color="error">{authError}</Typography>}
        <Button
          color="primary"
          variant="outlined"
          fullWidth
          type="submit"
          size="large"
          style={{ marginTop: '16px' }}
        >
          Register
        </Button>
      </form>
    </Container>
  );
};

export default Register;
