import { api } from "@/store/api";
import type { AppUser, UsersResponse } from "@/shared/types";

export const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAdminStatus: builder.query<boolean, string | undefined>({
      query: (email) => `/users/admin/${email ?? ""}`,
      providesTags: ["Admin"],
    }),

    getUserByEmail: builder.query<AppUser | null, string | undefined>({
      query: (email) => `/users/${email ?? ""}`,
      providesTags: (_result, _error, email) => [{ type: "Users", id: email }],
    }),

    getAllUsers: builder.query<
      UsersResponse,
      { page?: number; limit?: number; search?: string } | void
    >({
      query: (params) => {
        const qs = new URLSearchParams();
        const p = params ?? {};
        if (p.page) qs.set("page", String(p.page));
        if (p.limit) qs.set("limit", String(p.limit));
        if (p.search) qs.set("search", p.search);
        return `/users${qs.toString() ? `?${qs}` : ""}`;
      },
      providesTags: ["Users"],
    }),

    updateUserRole: builder.mutation<unknown, { id: string; role: "admin" | "premium" | "normal" }>({
      query: ({ id, role }) => ({
        url: `/users/role/${id}`,
        method: "PATCH",
        body: { role },
      }),
      invalidatesTags: ["Users", "Admin"],
    }),

    deleteUser: builder.mutation<unknown, string>({
      query: (id) => ({ url: `/users/${id}`, method: "DELETE" }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetAdminStatusQuery,
  useGetUserByEmailQuery,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
} = usersApi;
