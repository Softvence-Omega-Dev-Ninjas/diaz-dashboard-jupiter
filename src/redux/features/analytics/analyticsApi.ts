import { baseApi } from '@/redux/api/baseApi';

const analyticsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAnalyticsStats: build.query({
      query: () => ({
        url: `/visitor/analytics/overview`,
        method: 'GET',
      }),
    }),

    getTopViewedBoats: build.query({
      query: () => ({
        url: `/boats/top-viewed`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetAnalyticsStatsQuery, useGetTopViewedBoatsQuery } =
  analyticsApi;
