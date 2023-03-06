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
  deleteFavourite,
  fetchPetTypes,
  fetchNearbyUsers,
  fetchPetsUser,
  fetchJobOffersUser,
  fetchJobOffersUserSearch,
  cleanState,
  fetchPetsUserSearch,
  fetchRequestsUser,
  fetchRequestInfoUserId,
  fetchJobOffersRequestUser,
  fetchRequestInfoUsers,
  updateUser,
  fetchReviewsUser,
  addNewPet,
  fetchReviewsUserSearch
} from "../actions";

const initialState = {
  users: [],
  loading: false,
  currentUser: [],
  userDetail: {},
  favouriteUsers: [],
  nearbyUsers: [],
  search: [],
  chatRecipients: [],
  petTypes: [],
  petsUsers: [],
  jobOffersUser: [],
  petsUsersSearch: [],
  jobOffersUserSearch: [],
  requestsUser: [],
  userContracted: [],
  userContractedJobOffers: [],
  isLogin: false,
  usersContracted: [],
  reviewsUser: [],
  reviewsUserSearch: [],
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
      state.userContracted = action.payload;
      state.chatRecipients.push(action.payload);
    });
    builder.addCase(searchView.fulfilled, (state, action) => {
      state.search = action.payload;
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
    builder.addCase(fetchPetTypes.fulfilled, (state, action) => {
      state.petTypes = action.payload;
    });
    builder.addCase(fetchPetsUser.fulfilled, (state, action) => {
      state.petsUsers = action.payload;
    });
    builder.addCase(fetchPetsUserSearch.fulfilled, (state, action) => {
      state.petsUsersSearch = action.payload;
    });
    builder.addCase(fetchNearbyUsers.fulfilled, (state, action) => {
      state.nearbyUsers = action.payload;
    });
    builder.addCase(fetchJobOffersUser.fulfilled, (state, action) => {
      state.jobOffersUser = action.payload;
    });
    builder.addCase(fetchJobOffersUserSearch.fulfilled, (state, action) => {
      state.jobOffersUserSearch = action.payload;
    });
    builder.addCase(cleanState.fulfilled, (state, action) => {
      state.jobOffersUserSearch = action.payload;
      state.petsUsersSearch = action.payload;
    });
    builder.addCase(fetchRequestsUser.fulfilled, (state, action) => {
      state.requestsUser = action.payload;
    });
    builder.addCase(fetchRequestInfoUserId.fulfilled, (state, action) => {
      state.userContracted = action.payload;
    });
    builder.addCase(fetchJobOffersRequestUser.fulfilled, (state, action) => {
      state.userContractedJobOffers = action.payload;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      const { formData, profile_pic } = action.meta.arg;
      state.currentUser = {
        ...state.currentUser,
        ...{ data: { ...state.currentUser.data, ...formData, profile_pic: profile_pic } }
      };
    });
    builder.addCase(addNewPet.fulfilled, (state, action) => {
      state.petsUsers.push(action.payload);
    });
    builder.addCase(fetchReviewsUser.fulfilled, (state, action) => {
      state.reviewsUser = action.payload;
    });
    builder.addCase(fetchReviewsUserSearch.fulfilled, (state, action) => {
      state.reviewsUserSearch = action.payload;
    });
  }
});

export const { actionLogin } = usersReducer.actions;

export default usersReducer.reducer;
