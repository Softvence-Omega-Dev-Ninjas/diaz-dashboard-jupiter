/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from '@/redux/api/baseApi';

export interface SpecificationParams {
  type: string;
  search?: string;
  limit?: number;
}

export interface SpecificationResponse {
  items: string[];
  total?: number;
}

const boatSpecificationsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Get boat specifications with search and pagination
    getSpecifications: build.query<SpecificationResponse, SpecificationParams>({
      query: ({ type, search = '', limit = 20 }) => ({
        url: `/boats/specification/list`,
        method: 'GET',
        params: {
          type,
          search,
          limit,
        },
      }),
      transformResponse: (response: any) => {
        // Handle different response formats from the API
        if (response.items && Array.isArray(response.items)) {
          return response;
        } else if (Array.isArray(response)) {
          return { items: response };
        } else if (response.data && Array.isArray(response.data)) {
          return { items: response.data, total: response.total };
        } else {
          console.warn('⚠️ Unexpected response format:', response);
          return { items: [] };
        }
      },
      // Keep data cached for 5 minutes
      keepUnusedDataFor: 300,
    }),

    // Get all subscriptions/packages
    getAllSubscriptions: build.query({
      query: () => ({
        url: '/subscription/plans',
        method: 'GET',
      }),
      providesTags: ['Listing'],
    }),
  }),
});

export const {
  useGetSpecificationsQuery,
  useLazyGetSpecificationsQuery,
  useGetAllSubscriptionsQuery,
} = boatSpecificationsApi;

export default boatSpecificationsApi;
