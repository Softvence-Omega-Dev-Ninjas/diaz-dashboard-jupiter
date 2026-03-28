import { baseApi } from '@/redux/api/baseApi';

const leadsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCustomerContacted: build.query({
      query: ({ page, limit }) => ({
        url: `/contact/contact-us?page=${page}&limit=${limit}`,
        method: 'GET',
      }),
      providesTags: ['Leads'],
    }),

    getBoatLeads: build.query({
      query: ({ page, limit, source }) => {
        let url = `/contact?page=${page}&limit=${limit}&type=INDIVIDUAL_LISTING`;
        if (source) {
          url += `&source=${source}`;
        }
        return {
          url,
          method: 'GET',
        };
      },
      providesTags: ['Leads'],
    }),

    updateBoatLeadsStatus: build.mutation({
      query: ({ leadId }) => ({
        url: `/contact/${leadId}/status`,
        method: 'PATCH',
        body: { status: 'Contacted' },
      }),
      invalidatesTags: ['Leads'],
    }),
  }),
});

export const {
  useGetCustomerContactedQuery,
  useGetBoatLeadsQuery,
  useUpdateBoatLeadsStatusMutation,
} = leadsApi;
