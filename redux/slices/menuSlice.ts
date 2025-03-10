import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MenuItem } from "types/types";

type MenuState = {
  selectedMenu: MenuItem | null;
  expandedNodes: Set<string>; 
};

const initialState: MenuState = {
  selectedMenu: null,
  expandedNodes: new Set<string>(),  
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setSelectedMenu: (state, action: PayloadAction<MenuItem | null>) => {
      state.selectedMenu = action.payload;
    },
    setExpandedNodes: (state, action: PayloadAction<Set<string>>) => {
      state.expandedNodes = action.payload;
    },
  },
});

export const { setSelectedMenu, setExpandedNodes } = menuSlice.actions;
export default menuSlice.reducer;
