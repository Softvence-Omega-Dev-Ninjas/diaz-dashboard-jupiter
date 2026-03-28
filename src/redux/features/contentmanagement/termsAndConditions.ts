import { baseApi } from '@/redux/api/baseApi';
import type { TermsAndConditionsParams } from './types';

export const termsAndConditionsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTermsAndConditions: build.query({
      query: (site) => ({
        url: `/terms-of-service?site=${site}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, site) => [
        { type: 'TermsOfService', id: site },
      ],
      keepUnusedDataFor: 0,
    }),

    createTermsAndConditions: build.mutation({
      query: ({ site, termsAndConditions }: TermsAndConditionsParams) => ({
        url: `/terms-of-service/create?site=${site}`,
        method: 'POST',
        body: termsAndConditions,
      }),
      invalidatesTags: (_result, _error, { site }) => [
        { type: 'TermsOfService', id: site },
      ],
    }),

    updateTermsAndConditions: build.mutation({
      query: ({ site, termsAndConditions }: TermsAndConditionsParams) => ({
        url: `/terms-of-service?site=${site}`,
        method: 'PATCH',
        body: termsAndConditions,
      }),
      invalidatesTags: (_result, _error, { site }) => [
        { type: 'TermsOfService', id: site },
      ],
    }),
  }),
});

export const {
  useGetTermsAndConditionsQuery,
  useCreateTermsAndConditionsMutation,
  useUpdateTermsAndConditionsMutation,
} = termsAndConditionsApi;
