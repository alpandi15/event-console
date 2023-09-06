import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  menu: []
};

export const sideMenuSlice = createSlice({
  name: "sideMenu",
  initialState,
  reducers: {
    setMenuReducer: (state, action) => {
      state.menu = action.payload
    }
  },
});

export const { setMenuReducer } = sideMenuSlice.actions
export const selectSideMenu = (state) => state.sideMenu.menu;

export default sideMenuSlice.reducer;
