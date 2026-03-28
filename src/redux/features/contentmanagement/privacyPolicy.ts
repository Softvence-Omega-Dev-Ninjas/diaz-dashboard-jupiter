import { baseApi } from '@/redux/api/baseApi';
import type { PrivacyPolicyParams } from './types';

export const privacyPolicyApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPrivacyPolicy: build.query({
      query: (site) => ({
        url: `/privacy-policy?site=${site}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, site) => [
        { type: 'PrivacyPolicy', id: site },
      ],
      keepUnusedDataFor: 0,
    }),

    createPrivacyPolicy: build.mutation({
      query: ({ site, privacyPolicy }: PrivacyPolicyParams) => ({
        url: `/privacy-policy/create?site=${site}`,
        method: 'POST',
        body: privacyPolicy,
      }),
      invalidatesTags: (_result, _error, { site }) => [
        { type: 'PrivacyPolicy', id: site },
      ],
    }),

    updatePrivacyPolicy: build.mutation({
      query: ({ site, privacyPolicy }: PrivacyPolicyParams) => ({
        url: `/privacy-policy?site=${site}`,
        method: 'PATCH',
        body: privacyPolicy,
      }),
      invalidatesTags: (_result, _error, { site }) => [
        { type: 'PrivacyPolicy', id: site },
      ],
    }),
  }),
});

export const {
  useGetPrivacyPolicyQuery,
  useCreatePrivacyPolicyMutation,
  useUpdatePrivacyPolicyMutation,
} = privacyPolicyApi;
