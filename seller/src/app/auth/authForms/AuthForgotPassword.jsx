import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Link from 'next/link';

import CustomTextField from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomFormLabel';
import AuthSocialButtons from './AuthSocialButtons';

export default function AuthForgotPassword({ token, email }) {
  return (
    <>
      {token && email ? (
        <Stack mt={4} spacing={2}>
          <AuthSocialButtons title="Sign in with" />
        </Stack>
      ) : (
        <Stack mt={4} spacing={2}>
          <CustomFormLabel htmlFor="reset-email">Email Address</CustomFormLabel>
          <CustomTextField id="reset-email" variant="outlined" fullWidth />

          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            component={Link}
            href="/"
          >
            Forgot Password
          </Button>
          <Button color="primary" size="large" fullWidth component={Link} href="/auth/login">
            Back to Login
          </Button>
        </Stack>
      )}
    </>
  );
}
