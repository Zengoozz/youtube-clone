import { configureStore } from "@reduxjs/toolkit";

import { youtubeApi } from "../redux/services/youtubeApi"
import previewReducer from "./features/previewSlice"

export const store = configureStore({
    reducer: {
        [youtubeApi.reducerPath]: youtubeApi.reducer,
        preview: previewReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(youtubeApi.middleware)
})