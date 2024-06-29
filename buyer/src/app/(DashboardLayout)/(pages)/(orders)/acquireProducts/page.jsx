'use client';

import { Box } from '@mui/material';
import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import AcquireProductsList from '@/app/(DashboardLayout)/components/order/AcquireProductsList/AcquireProductsList';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Acquire Products',
  },
];

const AcquireProducts = () => {
  return (
    <PageContainer title="Acquire Products" description="this is Acquire Products">
      {/* breadcrumb */}
      <Breadcrumb title="Acquire Products" items={BCrumb} />
      {/* end breadcrumb */}
      <Box>
        <AcquireProductsList />
      </Box>
    </PageContainer>
  );
};

export default AcquireProducts;
