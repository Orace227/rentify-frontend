'use client';

import CustomSocialButton from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomSocialButton';
import { Stack } from '@mui/system';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthSocialButtons = ({ title }) => {
  const { data: session } = useSession();
  console.log('session', session);
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      if (session && session.user) {
        try {
          console.log(session.user);
        } catch (error) {
          console.log(error);
        }
      }
    };
    handleAuth();
  }, [session, router]);

  return (
    <>
      <Stack mt={3}>
        <CustomSocialButton
          onClick={() => {
            signIn('google');
          }}
        >
          <Avatar
            src={'/images/svgs/google-icon.svg'}
            alt={'icon1'}
            sx={{
              width: 16,
              height: 16,
              borderRadius: 0,
              mr: 1,
            }}
          />
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              whiteSpace: 'nowrap',
              mr: { sm: '3px' },
            }}
          >
            {title}{' '}
          </Box>{' '}
          Google
        </CustomSocialButton>
      </Stack>
    </>
  );
};

export default AuthSocialButtons;
