import { baseApi } from '@/redux/api/baseApi';

const listingManagementApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllListing: build.query({
      query: ({ page, limit, search, status }) => {
        let url = `/admin/listings?page=${page}&limit=${limit}`;

        if (search && search.trim() !== '') {
          url += `&search=${encodeURIComponent(search.trim())}`;
        }

        if (status && status.trim() !== '') {
          url += `&status=${encodeURIComponent(status)}`;
        }

        return {
          url,
          method: 'GET',
        };
      },
      providesTags: ['Listing'],
    }),

    getListingById: build.query({
      query: (id) => ({
        url: `/admin/listings/${id}`,
        method: 'GET',
      }),
      providesTags: ['Listing'],
    }),

    createListing: build.mutation({
      query: (listingData) => ({
        url: `/admin/listings/admin-create-listing`,
        method: 'POST',
        body: listingData,
      }),
      invalidatesTags: ['Listing'],
    }),

    updateListing: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/admin/listings/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Listing'],
    }),

    deleteListing: build.mutation({
      query: (id) => ({
        url: `/admin/listings/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Listing'],
    }),

    updateListingStatus: build.mutation({
      query: ({ id, status }) => ({
        url: `/admin/listings/${id}`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['Listing'],
    }),
  }),
});

export const {
  useGetAllListingQuery,
  useGetListingByIdQuery,
  useCreateListingMutation,
  useUpdateListingMutation,
  useDeleteListingMutation,
  useUpdateListingStatusMutation,
} = listingManagementApi;
