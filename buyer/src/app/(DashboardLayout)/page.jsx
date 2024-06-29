'use client';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
// components
import SalesOverview from '@/app/(DashboardLayout)/components/dashboard/SalesOverview';
import YearlyBreakup from '@/app/(DashboardLayout)/components/dashboard/YearlyBreakup';
import RecentTransactions from '@/app/(DashboardLayout)/components/dashboard/RecentTransactions';
import ProductPerformance from '@/app/(DashboardLayout)/components/dashboard/ProductPerformance';
import Blog from '@/app/(DashboardLayout)/components/dashboard/Blog';
import MonthlyEarnings from '@/app/(DashboardLayout)/components/dashboard/MonthlyEarnings';
import WelcomeCard from './components/dashboard/WelcomeCard';
import TopCards from './components/dashboard/TopCards';

export default function Dashboard() {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <WelcomeCard />
          </Grid>

          <Grid item xs={12} lg={6}>
            <TopCards />
          </Grid>

          <Grid item xs={12} lg={4}>
            <RecentTransactions />
          </Grid>
          <Grid item xs={12} lg={8}>
            <SalesOverview />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}
