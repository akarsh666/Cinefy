import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice.js";
import themeModeReducer from "./features/themeModeSlice.js";
import authModalReducer from "./features/authModalSlice.js";
import globalLoadingReducer from "./features/globalLoadingSlice.js";
import appStateReducer from "./features/appStateSlice.js";

const store = configureStore({
  reducer: {
    user: userReducer,
    themeMode: themeModeReducer,
    authModal: authModalReducer,
    globalLoading: globalLoadingReducer,
    appState: appStateReducer,
  },
});

export default store;
