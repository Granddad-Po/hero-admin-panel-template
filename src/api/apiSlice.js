import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({baseUrl: 'https://65f0508bda8c6584131b69b7.mockapi.io/api'}),
	tagTypes: ['Heroes'],
	endpoints: builder => ({
		getHeroes: builder.query({
			query: () => '/hero',
			providesTags: ['Heroes']
		}),
		createHero: builder.mutation({
			query: hero => ({
				url: '/hero',
				method: 'POST',
				body: hero
			}),
			invalidatesTags: ['Heroes']
		}),
		deleteHero: builder.mutation({
			query: id => ({
				url: `/hero/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['Heroes']
		}),
		getFilters: builder.query({
			query: () => '/filter',
			providesTags: ['Filter']
		})
	})
})

export const {useGetHeroesQuery, useCreateHeroMutation, useDeleteHeroMutation, useGetFiltersQuery} = apiSlice