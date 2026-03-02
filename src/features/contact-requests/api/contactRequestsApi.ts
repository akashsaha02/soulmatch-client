import { api } from "@/store/api";
import type { ContactRequest } from "@/shared/types";

export const contactRequestsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createPaymentIntent: builder.mutation<{ clientSecret: string }, { price: number }>({
      query: (body) => ({
        url: "/create-payment-intent",
        method: "POST",
        body,
      }),
    }),

    createContactRequest: builder.mutation<unknown, Partial<ContactRequest>>({
      query: (body) => ({ url: "/payments", method: "POST", body }),
      invalidatesTags: ["ContactRequests"],
    }),

    getMyContactRequests: builder.query<ContactRequest[], string | undefined>({
      query: (email) => `/contact-requests?email=${email ?? ""}`,
      providesTags: ["ContactRequests"],
    }),

    deleteContactRequest: builder.mutation<unknown, string>({
      query: (id) => ({ url: `/contact-requests/${id}`, method: "DELETE" }),
      invalidatesTags: ["ContactRequests"],
    }),

    getAdminContactRequests: builder.query<ContactRequest[], void>({
      query: () => "/admin/contact-requests",
      providesTags: ["ContactRequests"],
    }),

    approveContactRequest: builder.mutation<unknown, { id: string; biodataId: number }>({
      query: ({ id, biodataId }) => ({
        url: `/admin/contact-requests/${id}`,
        method: "PATCH",
        body: { biodataId },
      }),
      invalidatesTags: ["ContactRequests"],
    }),
  }),
});

export const {
  useCreatePaymentIntentMutation,
  useCreateContactRequestMutation,
  useGetMyContactRequestsQuery,
  useDeleteContactRequestMutation,
  useGetAdminContactRequestsQuery,
  useApproveContactRequestMutation,
} = contactRequestsApi;
