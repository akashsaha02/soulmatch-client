import { api } from "@/store/api";
import type { Message, InboxItem } from "@/shared/types";

export const messagesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation<
      unknown,
      { receiverEmail: string; content: string }
    >({
      query: (body) => ({ url: "/messages", method: "POST", body }),
      invalidatesTags: ["Messages"],
    }),

    getInbox: builder.query<InboxItem[], string>({
      query: (email) => `/messages/inbox?email=${email}`,
      providesTags: ["Messages"],
    }),

    getMessageThread: builder.query<
      Message[],
      { otherEmail: string; currentEmail: string }
    >({
      query: ({ otherEmail, currentEmail }) =>
        `/messages/thread/${otherEmail}?email=${currentEmail}`,
      providesTags: (_result, _error, { otherEmail }) => [
        { type: "Messages", id: otherEmail },
      ],
    }),

    markMessageRead: builder.mutation<unknown, string>({
      query: (id) => ({ url: `/messages/${id}/read`, method: "PATCH" }),
      invalidatesTags: ["Messages"],
    }),
  }),
});

export const {
  useSendMessageMutation,
  useGetInboxQuery,
  useGetMessageThreadQuery,
  useMarkMessageReadMutation,
} = messagesApi;
