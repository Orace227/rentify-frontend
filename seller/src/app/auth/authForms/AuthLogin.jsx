import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import CustomCheckbox from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomCheckbox';
import CustomTextField from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomFormLabel';
import AuthSocialButtons from './AuthSocialButtons';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const AuthLogin = ({ title, subtitle, subtext }) => {
  const router = useRouter();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      console.log(values);
      const body = values;
      const registeredUser = await axios.post('/customer/auth/login', body);
      console.log('USER', registeredUser.data);
      if (registeredUser.status === 200) {
        toast.success('You logged in successfully!');

        document.cookie = `customerAuthToken=${registeredUser.data.token}; expires=${new Date(
          Date.now() + 15 * 24 * 60 * 60 * 1000,
        ).toUTCString()}; path=/;`;

        router.push('/');

        resetForm();
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        if (error.response.status === 400) {
          toast.error('You are not logged in please verify your email');
        }
        if (error.response.status === 401) {
          toast.error('You are not logged in check your credentials!');
        }
        if (error.response.status === 404) {
          toast.error('You are not logged in check your credentials!');
        }
        if (error.response.status === 500) {
          toast.error('Some internal server error!');
        }
      }
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <AuthSocialButtons title="Sign in with" />
      <Box mt={3}>
        <Divider>
          <Typography
            component="span"
            color="textSecondary"
            variant="h6"
            fontWeight="400"
            position="relative"
            px={2}
          >
            or sign in with
          </Typography>
        </Divider>
      </Box>

      <form onSubmit={formik.handleSubmit}>
        <Stack>
          <Box>
            <CustomFormLabel htmlFor="email">Email</CustomFormLabel>
            <CustomTextField
              id="email"
              name="email"
              variant="outlined"
              fullWidth
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Box>
          <Box>
            <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
            <CustomTextField
              id="password"
              name="password"
              type="password"
              variant="outlined"
              fullWidth
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Box>
          <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
            <FormGroup>
              <FormControlLabel
                control={<CustomCheckbox defaultChecked />}
                label="Remember this Device"
              />
            </FormGroup>
            <Typography
              component={Link}
              href="/auth/forgot-password"
              fontWeight="500"
              sx={{
                textDecoration: 'none',
                color: 'primary.main',
              }}
            >
              Forgot Password?
            </Typography>
          </Stack>
        </Stack>
        <Box>
          <Button color="primary" variant="contained" size="large" fullWidth type="submit">
            Sign In
          </Button>
        </Box>
      </form>
      {subtitle}
    </>
  );
};

export default AuthLogin;
