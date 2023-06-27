import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import memoReducer from "./features/memoSlice";
import favoriteMemoReducer from "./features/favoriteMemoSlice";
import normalMemoReducer from "./features/normalMemoSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        memo: memoReducer,
        favoriteMemo: favoriteMemoReducer,
        normalMemo: normalMemoReducer,
    },
});