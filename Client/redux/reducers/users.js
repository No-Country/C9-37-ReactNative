import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUsers,
  sortUsersByRating,
  fetchUserById,
  searchView,
  registerUser,
  loginUser,
  logOutUser,
  fetchFavourites,
  addFavourite,
  deleteFavourite
} from "../actions";

const initialState = {
  users: [],
  loading: false,
  currentUser: [],
  userDetail: {},
  favouriteUsers: [],
  search: [],
  chatRecipients: [],
  isLogin: false
};

const usersReducer = createSlice({
  name: "users",
  initialState,
  reducers: {
    actionLogin: (state, action) => {
      state.isLogin = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(sortUsersByRating.fulfilled, (state, action) => {
      state.search = action.payload;
    });
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      const { payload } = action;
      state.chatRecipients.push(payload);
    });
    builder.addCase(searchView.fulfilled, (state, action) => {
      const { payload } = action;
      state.search = [payload];
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.fbError = action.error;
    });
    builder.addCase(loginUser.pending, state => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
    });
    builder.addCase(loginUser.rejected, state => {
      state.loading = false;
    });
    builder.addCase(logOutUser.fulfilled, (state, action) => {
      state.currentUser = [];
      state.isLogin = false;
    });
    builder.addCase(fetchFavourites.fulfilled, (state, action) => {
      state.favouriteUsers = action.payload;
    });
    // builder.addCase(addFavourite.fulfilled, (state, action) => {
    //   state.favouriteUsers.push(action.payload);
    // });
    // builder.addCase(deleteFavourite.fulfilled, (state, action) => {
    //   const newArray = state.favouriteUsers.filter(
    //     favUser => favUser.fav_user_id !== action.payload
    //   );
    //   state.favouriteUsers = newArray;
    // });
  }
});

export const { addFavouriteUser, removeFavouriteUser, actionLogin } = usersReducer.actions;

export default usersReducer.reducer;
