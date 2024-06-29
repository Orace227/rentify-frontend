'use client';

import { Box } from '@mui/material';
import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import ProductTableList from '@/app/(DashboardLayout)/components/product/ProductTableList/ProductTableList';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Product List',
  },
];

const Products = () => {
  return (
    <PageContainer title="Product List" description="this is Product List">
      {/* breadcrumb */}
      <Breadcrumb title="Product List" items={BCrumb} />
      {/* end breadcrumb */}
      <Box>
        <ProductTableList />
      </Box>
    </PageContainer>
  );
};

export default Products;
