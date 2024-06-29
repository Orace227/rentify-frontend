'use client';

import Grid from '@mui/material/Grid';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';

import ProfileBanner from '@/app/(DashboardLayout)/components/profile/ProfileBanner';
// import useAuth from '@/app/hooks/useAuth';
// import IntroCard from '@/app/(DashboardLayout)/components/profile/IntroCard';
// import AddressCard from '@/app/(DashboardLayout)/components/profile/AddressCard';
import { useEffect } from 'react';
// import { useCustomer } from '@/app/hooks/useCustomer';
import axios from 'axios';
import { useSeller } from '@/app/hooks/useSeller';
// import CustomToast from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomToast';

const UserProfile = () => {
  // useAuth();
  // const { customer } = useCustomer();
  const { seller } = useSeller();

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        console.log('customer form profile page', customerRes);
      } catch (error) {
        console.log(error);
        // CustomToast({ status: 'error', message: 'Error fetching customer' });
      }
    };
    fetchCustomer();
  }, []);

  return (
    <PageContainer title="Profile" description="this is Profile">
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <ProfileBanner />
        </Grid>
        {/* <Grid item sm={8}>
          <AddressCard />
        </Grid>
        <Grid item sm={4}>
          <IntroCard />
        </Grid> */}
      </Grid>
    </PageContainer>
  );
};

export default UserProfile;
