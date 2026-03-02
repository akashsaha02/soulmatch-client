import { api } from "@/store/api";
import type { SuccessStory } from "@/shared/types";

export const successStoriesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSuccessStories: builder.query<SuccessStory[], void>({
      query: () => "/success-stories",
      providesTags: ["SuccessStories"],
    }),

    createSuccessStory: builder.mutation<unknown, Omit<SuccessStory, "_id">>({
      query: (body) => ({ url: "/success-stories", method: "POST", body }),
      invalidatesTags: ["SuccessStories"],
    }),
  }),
});

export const {
  useGetSuccessStoriesQuery,
  useCreateSuccessStoryMutation,
} = successStoriesApi;
