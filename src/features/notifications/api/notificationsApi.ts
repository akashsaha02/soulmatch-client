import { api } from "@/store/api";
import type { NotificationsResponse } from "@/shared/types";

export const notificationsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<
      NotificationsResponse,
      { email: string; page?: number; limit?: number; unreadOnly?: boolean }
    >({
      query: ({ email, page = 1, limit = 20, unreadOnly }) => {
        const qs = new URLSearchParams({ page: String(page), limit: String(limit) });
        if (unreadOnly) qs.set("unreadOnly", "true");
        return `/notifications/${email}?${qs}`;
      },
      providesTags: (_result, _error, { email }) => [{ type: "Notifications", id: email }],
    }),

    markNotificationRead: builder.mutation<unknown, string>({
      query: (id) => ({ url: `/notifications/${id}/read`, method: "PATCH" }),
      invalidatesTags: ["Notifications"],
    }),

    markAllNotificationsRead: builder.mutation<unknown, string | void>({
      query: (email) => ({
        url: "/notifications/read-all",
        method: "PATCH",
        body: email ? { email } : {},
      }),
      invalidatesTags: ["Notifications"],
    }),

    getUnreadNotificationCount: builder.query<{ count: number }, string>({
      query: (email) => `/notifications/unread-count/${email}`,
      providesTags: (_result, _error, email) => [{ type: "Notifications", id: email }],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useMarkNotificationReadMutation,
  useMarkAllNotificationsReadMutation,
  useGetUnreadNotificationCountQuery,
} = notificationsApi;
