import { baseApi } from '@/redux/api/baseApi';

const dashboardOverviewApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getDashboardOverview: build.query({
      query: () => ({
        url: `/admin/dashboard/summary`,
        method: 'GET',
      }),
    }),

    getRecentActivity: build.query({
      query: () => ({
        url: `/admin/dashboard/recent-activity`,
        method: 'GET',
      }),
    }),

    getPerformanceOverview: build.query({
      query: () => ({
        url: `/admin/dashboard/performance-overview`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetDashboardOverviewQuery,
  useGetRecentActivityQuery,
  useGetPerformanceOverviewQuery,
} = dashboardOverviewApi;
