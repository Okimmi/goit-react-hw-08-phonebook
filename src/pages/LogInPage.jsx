import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import { Alert, Box, InputAdornment, TextField } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { selectLoading } from 'redux/contacts/selectors';
import { logIn } from 'redux/auth/operations';
import { selectIsError } from 'redux/auth/selectors';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Enter a valid email. For example user@gmail.com')
    .required(),
});

export const LogInPage = () => {
  const dispatch = useDispatch();

  const loading = useSelector(selectLoading);
  const error = useSelector(selectIsError);

  const logInUser = values => {
    dispatch(logIn(values));
  };

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: schema,
    onSubmit: logInUser,
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
            Log in
          </LoadingButton>
        </form>
      </Box>
      {error === 'login' && (
        <Alert
          severity="error"
          sx={{
            mt: 2,
          }}
        >
          Invalid email or password. Please check your credentials and try
          again.
        </Alert>
      )}
    </>
  );
};
