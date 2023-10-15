import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { Box, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { schema } from './ContactFormSchema';
import { selectLoading } from 'redux/contacts/selectors';

export const ContactForm = ({ children, initialValues, onSubmit, style }) => {
  const loading = useSelector(selectLoading);

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit,
  });

  return (
    <Box sx={style}>
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
        />
        <TextField
          name="number"
          label="Number"
          type="tel"
          id="number"
          variant="filled"
          margin="dense"
          fullWidth
          value={formik.values.number}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.number && Boolean(formik.errors.number)}
          helperText={formik.touched.number && formik.errors.number}
        />
        <LoadingButton
          variant="contained"
          type="submit"
          loading={loading}
          sx={{
            mt: 2,
          }}
        >
          {children}
        </LoadingButton>
      </form>
    </Box>
  );
};
