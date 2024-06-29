'use client';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Logo from '@/app/(DashboardLayout)/layout/shared/logo/Logo';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import AuthForgotPassword from '../../authForms/AuthForgotPassword';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

export default function ForgotPassword2() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();

  const email = searchParams.get('email');
  const token = searchParams.get('token');

  return (
    <PageContainer title="Forgot Password Page" description="this is Sample page">
      <Box
        sx={{
          position: 'relative',
          '&:before': {
            content: '""',
            background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite',
            position: 'absolute',
            height: '100%',
            width: '100%',
            opacity: '0.3',
          },
        }}
      >
        <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
          <Grid
            item
            xs={12}
            sm={12}
            lg={4}
            xl={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '500px' }}>
              <Box display="flex" alignItems="center" justifyContent="center">
                <Logo />
              </Box>
              <Typography
                color="textSecondary"
                textAlign="justify"
                variant="subtitle2"
                fontWeight="400"
              >
                {token && email ? (
                  <Typography>
                    Please log in with the email address associated with your account. This step
                    helps us{' '}
                    <span className="font-bold ">
                      verify your identity and ensures the security of your account.
                    </span>{' '}
                    Once verified, you will be able to reset your password.
                  </Typography>
                ) : (
                  'Please enter the email address associated with your account and We will email you a link to reset your password.'
                )}
              </Typography>
              <AuthForgotPassword token={token} email={email} />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}

ForgotPassword2.layout = 'Blank';
