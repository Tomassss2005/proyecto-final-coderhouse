import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseData = process.env.EXPO_PUBLIC_BASE_RTDB_URL

export const shopApi = createApi({
    reducerPath: "shopApi",
    baseQuery: fetchBaseQuery({ baseUrl: baseData }),
    endpoints: (builder) => ({
        getCategories: builder.query({ query: () => 'categories.json' }),
        getClothesByCategory: builder.query({
            query: (category) => `clothes.json?orderBy="category"&equalTo="${category}"`,
            transformResponse: (response) => {
                return Object.values(response)
            }
        })
    })
})

export const { useGetCategoriesQuery, useGetClothesByCategoryQuery } = shopApi