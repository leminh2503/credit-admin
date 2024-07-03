import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IAccountInfo} from "../../types";

const initialState: {user: IAccountInfo | null} = {user: null};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<IAccountInfo>) => {
      console.log("action.payload---", action.payload);
      state.user = action.payload;
    },
    logoutUser: () => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const {loginUser, logoutUser} = UserSlice.actions;

export default UserSlice.reducer;
