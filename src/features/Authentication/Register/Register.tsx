import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Container, Typography } from '@mui/material';

// Updated validation schema
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const Register = () => {
  const formik = useFormik({
    // Updated initial values
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log('Form values:', values);
      // Handle registration logic here
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
          onChange={formik.handleChange}
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
          onChange={formik.handleChange}
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
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
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
