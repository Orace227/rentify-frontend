'use client';

import { Box } from '@mui/material';
import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import ProductList from '../../components/product/ProductTableList/ProductList';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Product List',
  },
];

const buyProducts = () => {
  return (
    <PageContainer title="Product List" description="this is Product List">
      {/* breadcrumb */}
      <Breadcrumb title="Product List" items={BCrumb} />
      {/* end breadcrumb */}
      <Box>
        <ProductList />
      </Box>
    </PageContainer>
  );
};

export default buyProducts;
