import { baseApi } from '@/redux/api/baseApi';

const notificationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllNotifications: build.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: `/auth/notification?page=${page}&limit=${limit}`,
        method: 'GET',
      }),
      providesTags: ['Notification'],
    }),

    markAsRead: build.mutation({
      query: (id) => ({
        url: `/auth/notification/mark-as-read/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Notification'],
    }),

    markAllRead: build.mutation({
      query: () => ({
        url: `/auth/notification/mark-all-as-read`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Notification'],
    }),
  }),
});

export const {
  useGetAllNotificationsQuery,
  useMarkAsReadMutation,
  useMarkAllReadMutation,
} = notificationApi;
