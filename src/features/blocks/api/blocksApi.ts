import { api } from "@/store/api";
import type { Block } from "@/shared/types";

export const blocksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    blockBiodata: builder.mutation<unknown, { biodataId: string }>({
      query: (body) => ({ url: "/blocks", method: "POST", body }),
      invalidatesTags: ["Blocks"],
    }),

    unblockBiodata: builder.mutation<unknown, string>({
      query: (biodataId) => ({ url: `/blocks/${biodataId}`, method: "DELETE" }),
      invalidatesTags: ["Blocks"],
    }),

    getBlockedList: builder.query<Block[], string>({
      query: (email) => `/blocks/${email}`,
      providesTags: ["Blocks"],
    }),
  }),
});

export const {
  useBlockBiodataMutation,
  useUnblockBiodataMutation,
  useGetBlockedListQuery,
} = blocksApi;
