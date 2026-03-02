import { api } from "@/store/api";
import type { AdminStats, PremiumRequest, Report } from "@/shared/types";

export const adminApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAdminStats: builder.query<AdminStats, void>({
      query: () => "/admin/stats",
      providesTags: ["Admin"],
    }),

    getAllPremiumRequests: builder.query<PremiumRequest[], void>({
      query: () => "/admin/request-premium",
      providesTags: ["PremiumRequests"],
    }),

    getMyPremiumRequests: builder.query<PremiumRequest[], string | undefined>({
      query: (email) => `/request-premium/${email ?? ""}`,
      providesTags: ["PremiumRequests"],
    }),

    requestPremium: builder.mutation<unknown, string>({
      query: (biodataId) => ({
        url: `/request-premium/${biodataId}`,
        method: "POST",
      }),
      invalidatesTags: ["PremiumRequests"],
    }),

    approvePremiumRequest: builder.mutation<unknown, { id: string; userEmail: string }>({
      query: ({ id, userEmail }) => ({
        url: `/admin/premium-requests/${id}/approve`,
        method: "PATCH",
        body: { userEmail },
      }),
      invalidatesTags: ["PremiumRequests", "Users"],
    }),

    deletePremiumRequest: builder.mutation<unknown, string>({
      query: (id) => ({ url: `/admin/premium-requests/${id}`, method: "DELETE" }),
      invalidatesTags: ["PremiumRequests"],
    }),

    verifyBiodata: builder.mutation<unknown, { id: string; isVerified: boolean }>({
      query: ({ id, isVerified }) => ({
        url: `/admin/biodatas/${id}/verify`,
        method: "PATCH",
        body: { isVerified },
      }),
      invalidatesTags: ["Biodatas", "Biodata"],
    }),

    getAdminReports: builder.query<Report[], void>({
      query: () => "/admin/reports",
      providesTags: ["Reports"],
    }),
  }),
});

export const {
  useGetAdminStatsQuery,
  useGetAllPremiumRequestsQuery,
  useGetMyPremiumRequestsQuery,
  useRequestPremiumMutation,
  useApprovePremiumRequestMutation,
  useDeletePremiumRequestMutation,
  useVerifyBiodataMutation,
  useGetAdminReportsQuery,
} = adminApi;
