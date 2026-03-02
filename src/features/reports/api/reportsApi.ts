import { api } from "@/store/api";
import type { Report } from "@/shared/types";

export const reportsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    reportBiodata: builder.mutation<
      unknown,
      { biodataId: string; reason: string; description?: string }
    >({
      query: (body) => ({ url: "/reports", method: "POST", body }),
      invalidatesTags: ["Reports"],
    }),
  }),
});

export const { useReportBiodataMutation } = reportsApi;
