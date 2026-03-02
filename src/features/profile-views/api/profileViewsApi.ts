import { api } from "@/store/api";

export interface ProfileView {
  _id?: string;
  viewerEmail?: string;
  createdAt?: string;
  [key: string]: unknown;
}

export interface ProfileViewsResponse {
  views: ProfileView[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

export const profileViewsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    recordProfileView: builder.mutation<unknown, { biodataId: string }>({
      query: (body) => ({ url: "/profile-views", method: "POST", body }),
    }),

    getProfileViewers: builder.query<
      ProfileViewsResponse,
      { email: string; page?: number; limit?: number }
    >({
      query: ({ email, page = 1, limit = 20 }) =>
        `/profile-views/${email}?page=${page}&limit=${limit}`,
      providesTags: (_result, _error, { email }) => [{ type: "ProfileViews", id: email }],
    }),

    getProfileViewCount: builder.query<{ count: number }, string>({
      query: (email) => `/profile-views/count/${email}`,
      providesTags: (_result, _error, email) => [{ type: "ProfileViews", id: email }],
    }),
  }),
});

export const {
  useRecordProfileViewMutation,
  useGetProfileViewersQuery,
  useGetProfileViewCountQuery,
} = profileViewsApi;
