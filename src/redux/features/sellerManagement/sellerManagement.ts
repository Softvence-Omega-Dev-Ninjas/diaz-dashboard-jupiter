import { baseApi } from '@/redux/api/baseApi';

interface GetSellersParams {
  page?: number;
  limit?: number;
  search?: string;
  isVerified?: boolean;
  sortBy?: 'name' | 'boatsCount' | 'totalSalesValue' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

const sellerManagementApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllSellers: build.query({
      query: (params: GetSellersParams = {}) => {
        const queryParams = new URLSearchParams();
        if (params.page) queryParams.append('page', params.page.toString());
        if (params.limit) queryParams.append('limit', params.limit.toString());
        if (params.search) queryParams.append('search', params.search);
        if (params.isVerified !== undefined)
          queryParams.append('isVerified', params.isVerified.toString());
        if (params.sortBy) queryParams.append('sortBy', params.sortBy);
        if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);

        return {
          url: `/seller-management/sellers?${queryParams.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['Seller'],
    }),
    getSellerById: build.query({
      query: (sellerId: string) => ({
        url: `/seller-management/seller/${sellerId}`,
        method: 'GET',
      }),
      providesTags: ['Seller'],
    }),
  }),
});

export const { useGetAllSellersQuery, useGetSellerByIdQuery } =
  sellerManagementApi;
