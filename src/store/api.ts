import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getBaseUrl = () => process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000/";

const baseQuery = fetchBaseQuery({
  baseUrl: getBaseUrl(),
  prepareHeaders: (headers, { getState }) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access-token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    }
    return headers;
  },
});

export const api = createApi({
  reducerPath: "api",
  baseQuery: async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);
    if (result.error?.status === 401 || result.error?.status === 403) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("access-token");
        window.location.href = "/login";
      }
    }
    return result;
  },
  tagTypes: [
    "Biodata",
    "Biodatas",
    "Favourites",
    "ContactRequests",
    "Users",
    "Admin",
    "Interests",
    "ProfileViews",
    "Blocks",
    "Reports",
    "Messages",
    "Notifications",
    "PremiumRequests",
    "SuccessStories",
  ],
  endpoints: () => ({}),
});
