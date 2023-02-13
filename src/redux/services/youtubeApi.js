import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const youtubeApi = createApi({
    reducerPath: "youtubeApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://youtube-v31.p.rapidapi.com",
        prepareHeaders: (headers) => {
            headers.set("X-RapidAPI-Key", "395a0e58c5msh96872570360ed01p12c91djsn89f6d75d659d");

            return headers;
        }
    }),
    endpoints: (builder) => ({
        getVideosByGenre: builder.query({ query: (selectedCategory) => `/search?q=${selectedCategory}&part=snippet%2Cid&regionCode=US&maxResults=50&order=date` }),
        getVideosBySearch: builder.query({ query: (searchTerm) => `/search?q=${searchTerm}&part=snippet%2Cid&regionCode=US&maxResults=50&order=date` }),
        getChannelDetails: builder.query({ query: (channelId) => `/channels?part=snippet%2Cstatistics&id=${channelId}` }),
        getChannelVideos: builder.query({ query: (channelId) => `/search?&part=snippet%2Cid&order=date&maxResults=50&channelId=${channelId}` }),
        getVideoDetails: builder.query({query: (videoId) => `/videos?part=contentDetails%2Csnippet%2Cstatistics&id=${videoId}`}),
        getSimilarVideos: builder.query({query:(videoId) => `/search?relatedToVideoId=${videoId}&part=id%2Csnippet&type=video&maxResults=50`}),
        getVideoComments: builder.query({query:(videoId) => `/commentThreads?part=snippet&videoId=${videoId}&maxResults=50'`})
    })
})

export const {
    useGetVideosByGenreQuery,
    useGetVideosBySearchQuery,
    useGetChannelDetailsQuery,
    useGetChannelVideosQuery,
    useGetVideoDetailsQuery,
    useGetSimilarVideosQuery,
    useGetVideoCommentsQuery
} = youtubeApi