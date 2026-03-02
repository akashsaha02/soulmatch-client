import { api } from "@/store/api";
import type { Interest, InterestsResponse } from "@/shared/types";

export const interestsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    sendInterest: builder.mutation<unknown, { toBiodataId: string | number }>({
      query: (body) => ({ url: "/interests", method: "POST", body }),
      invalidatesTags: ["Interests"],
    }),

    getReceivedInterests: builder.query<
      InterestsResponse,
      { email: string; page?: number; limit?: number }
    >({
      query: ({ email, page = 1, limit = 10 }) =>
        `/interests/received?email=${email}&page=${page}&limit=${limit}`,
      providesTags: ["Interests"],
    }),

    getSentInterests: builder.query<
      InterestsResponse,
      { email: string; page?: number; limit?: number }
    >({
      query: ({ email, page = 1, limit = 10 }) =>
        `/interests/sent?email=${email}&page=${page}&limit=${limit}`,
      providesTags: ["Interests"],
    }),

    respondToInterest: builder.mutation<
      unknown,
      { id: string; status: "accepted" | "declined" }
    >({
      query: ({ id, status }) => ({
        url: `/interests/${id}/respond`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Interests"],
    }),

    getPendingInterestCount: builder.query<{ count: number }, string>({
      query: (email) => `/interests/count/${email}`,
      providesTags: ["Interests"],
    }),
  }),
});

export const {
  useSendInterestMutation,
  useGetReceivedInterestsQuery,
  useGetSentInterestsQuery,
  useRespondToInterestMutation,
  useGetPendingInterestCountQuery,
} = interestsApi;
