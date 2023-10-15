import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import { Alert, Box, InputAdornment, TextField } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { selectLoading } from 'redux/contacts/selectors';
import { register } from 'redux/auth/operations';
import { selectIsError } from 'redux/auth/selectors';

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    )
    .required(),
  email: yup
    .string()
    .email('Enter a valid email. For example user@gmail.com')
    .required(),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters.')
    .required(),
});

export const RegisterPage = () => {
  const dispatch = useDispatch();

  const loading = useSelector(selectLoading);
  const error = useSelector(selectIsError);

  const createUser = values => {
    dispatch(register(values));
  };

  const formik = useFormik({
    initialValues: { name: '', email: '', password: '' },
    validationSchema: schema,
    onSubmit: createUser,
  });

  return (
    <>
      <Box
        sx={{
          boxShadow: 1,
          width: '100%',
          maxWidth: 400,
          height: 'fit-content',
          color: 'grey.800',
          p: 2,
          borderRadius: 1,
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          textAlign: 'center',
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <TextField
            name="name"
            label="Name"
            type="text"
            id="name"
            variant="filled"
            margin="dense"
            fullWidth
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            name="email"
            label="E-mail"
            type="email"
            id="email"
            variant="filled"
            margin="dense"
            fullWidth
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            id="password"
            variant="filled"
            margin="dense"
            fullWidth
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
          />
          <LoadingButton
            variant="contained"
            type="submit"
            loading={loading}
            sx={{
              mt: 2,
            }}
          >
            Register
          </LoadingButton>
        </form>
      </Box>
      {error === 'register' && (
        <Alert
          severity="error"
          sx={{
            mt: 2,
          }}
        >
          Registration failed. Please try using a different email address.
        </Alert>
      )}
    </>
  );
};
