import SaveIcon from '@mui/icons-material/Save';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { unwrapResult } from '@reduxjs/toolkit';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import PageHeader from '../../../../shared/components/PageHeader/PageHeader';
import { STORE_STATUS } from '../../../../shared/models';
import { RootState, store } from '../../../../store/store';
import { User } from '../../../Authentication/models';
import { fetchUserById, modifyUser } from '../../slice/users.slice';

const userSchema = Yup.object().shape({
  uid: Yup.string().trim(),
  name: Yup.string()
    .required('Name is required')
    .trim()
    .min(2, 'Name must be at least 2 characters long'),
  email: Yup.string()
    .required('Email is required')
    .trim()
    .email('Invalid email address'),
  role: Yup.string()
    .required('Role is required')
    .trim()
    .oneOf(['admin', 'participant'], 'Invalid role'),
});

interface UserDetailsFormProps {
  id?: string;
}

const UserDetailsForm: React.FC<UserDetailsFormProps> = ({ id }) => {
  const dispatch = useDispatch<typeof store.dispatch>();
  const storeState = useSelector((state: RootState) => state.users.status);

  const formik = useFormik({
    initialValues: {
      uid: '',
      name: '',
      email: '',
      role: 'participant',
      attendedWorkshops: [] as string[],
      interests: [] as string[],
      certificates: [] as string[],
    } as User,
    validationSchema: userSchema,
    onSubmit: async (values) => {
      if (id) {
        try {
          const actionResult = await dispatch(
            modifyUser({ userId: values.uid, user: values }),
          );
          unwrapResult(actionResult);
        } catch (error) {
          console.error('Error updating user:', error);
        }
      }
    },
  });

  useEffect(() => {
    if (id) {
      const loadWorkshopData = async () => {
        try {
          const actionResult = await dispatch(fetchUserById(id));
          const user = unwrapResult(actionResult);
          formik.setValues({ ...user });
        } catch (error) {
          console.error('Failed to load user data:', error);
        }
      };

      loadWorkshopData();
    }
  }, [id, dispatch]);

  return (
    <>
      <PageHeader
        title="Edit User"
        buttonOptions={{
          title: 'Update',
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
            label="User Name"
            type="text"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            id="email"
            name="email"
            label="User Email"
            type="text"
            disabled
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              name="role"
              id="role"
              value={formik.values.role}
              label="Role"
              onChange={formik.handleChange}
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="participant">Participant</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </form>
    </>
  );
};

export default UserDetailsForm;
