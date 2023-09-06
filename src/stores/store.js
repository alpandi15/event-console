import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import sideMenuReducer from "./sideMenuSlice"

export const store = configureStore({
  reducer: {
    // darkMode: darkModeReducer,
    // colorScheme: colorSchemeReducer,
    sideMenu: sideMenuReducer,
    // simpleMenu: simpleMenuReducer,
    // topMenu: topMenuReducer,
  },
});