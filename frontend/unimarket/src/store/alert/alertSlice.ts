import { createSlice, PayloadAction, isAnyOf } from "@reduxjs/toolkit";
import { login, register, me } from "../auth/authSlice";
import { fetchUsers, fetchUserById, patchUser } from "../user/userSlice";
import {
  fetchListings,
  fetchMyListings,
  fetchListingsByUser,
  fetchListingById,
  createListing,
  patchListing,
  deleteListing,
} from "../listing/listingSlice";
import {
  fetchReviewsByListing,
  fetchReviewById,
  createReview,
  patchReview,
  patchLikeReview,
  patchUnlikeReview,
} from "../review/reviewSlice";
import {
  uploadProfileImage,
  uploadListingImage,
  uploadNewListingImage,
  deleteProfileImage,
  deleteListingImage,
  moveListingImages,
} from "../image/imageSlice";
import { getHttpErrorMessage } from "../../utils/errorApiResponse.util";
import { PURGE } from "redux-persist";

interface alertInterface {
  type?: "success" | "warning" | "danger" | "info";
  message: string;
  showMessage?: boolean;
}

const initialState: alertInterface = {
  type: "info",
  message: "",
  showMessage: false,
};

export const alertSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<alertInterface>) => {
      state.type = action.payload.type ? action.payload.type : "info";
      state.message = action.payload.message;
      state.showMessage = true;
    },
    cleanMessage: () => {
      return initialState;
    },
  },
  extraReducers: builder => {
    //LOGOUT
    builder.addCase(PURGE, state => {
      state.showMessage = true;
      state.type = "success";
      state.message = "come_back_soon";
    });

    // LOGIN - REGISTER - ME
    builder
      .addMatcher(isAnyOf(login.rejected), (state, action) => {
        const response = action as PayloadAction<{
          status: number;
        }>;
        state.showMessage = true;
        state.type = "danger";
        if (response.payload && response.payload.status) {
          state.message = getHttpErrorMessage(response.payload.status).title;
        } else {
          state.message = "oops_problem_ocurred";
        }
      })
      .addMatcher(isAnyOf(register.fulfilled), state => {
        state.showMessage = true;
        state.type = "success";
        state.message = "successfully_registered";
      })
      .addMatcher(isAnyOf(register.rejected), (state, action) => {
        const response = action as PayloadAction<{
          status: number;
        }>;
        state.showMessage = true;
        state.type = "danger";
        if (response.payload && response.payload.status) {
          state.message = getHttpErrorMessage(response.payload.status).title;
        } else {
          state.message = "oops_problem_ocurred";
        }
      })
      .addMatcher(isAnyOf(me.fulfilled), state => {
        state.showMessage = true;
        state.type = "success";
        state.message = "welcome";
      })
      .addMatcher(isAnyOf(me.rejected), state => {
        state.showMessage = true;
        state.type = "danger";
        state.message = "oops_problem_ocurred";
      });

    // USERS
    builder
      .addMatcher(isAnyOf(fetchUsers.rejected), (state, action) => {
        const response = action as PayloadAction<{
          status: number;
        }>;
        state.showMessage = true;
        state.type = "danger";
        if (response.payload && response.payload.status) {
          state.message = getHttpErrorMessage(response.payload.status).title;
        } else {
          state.message = "oops_problem_ocurred";
        }
      })
      .addMatcher(isAnyOf(fetchUserById.rejected), (state, action) => {
        const response = action as PayloadAction<{
          status: number;
        }>;
        state.showMessage = true;
        state.type = "danger";
        if (response.payload && response.payload.status) {
          state.message = getHttpErrorMessage(response.payload.status).title;
        } else {
          state.message = "oops_problem_ocurred";
        }
      })
      .addMatcher(isAnyOf(patchUser.fulfilled), state => {
        state.showMessage = true;
        state.type = "success";
        state.message = "successful_operation";
      })
      .addMatcher(isAnyOf(patchUser.rejected), (state, action) => {
        state.showMessage = true;
        state.type = "danger";
        const response = action as PayloadAction<{
          status: number;
        }>;
        if (response.payload && response.payload.status) {
          state.message = getHttpErrorMessage(response.payload.status).title;
        } else {
          state.message = "oops_problem_ocurred";
        }
      });

    // LISTING
    builder
      .addMatcher(isAnyOf(fetchListings.rejected), (state, action) => {
        state.showMessage = true;
        state.type = "danger";
        const response = action as PayloadAction<{
          status: number;
        }>;
        if (response.payload && response.payload.status) {
          state.message = getHttpErrorMessage(response.payload.status).title;
        } else {
          state.message = "oops_problem_ocurred";
        }
      })
      .addMatcher(isAnyOf(fetchMyListings.rejected), (state, action) => {
        state.showMessage = true;
        state.type = "danger";
        const response = action as PayloadAction<{
          status: number;
        }>;
        if (response.payload && response.payload.status) {
          state.message = getHttpErrorMessage(response.payload.status).title;
        } else {
          state.message = "oops_problem_ocurred";
        }
      })
      .addMatcher(isAnyOf(fetchListingsByUser.rejected), (state, action) => {
        state.showMessage = true;
        state.type = "danger";
        const response = action as PayloadAction<{
          status: number;
        }>;
        if (response.payload && response.payload.status) {
          state.message = getHttpErrorMessage(response.payload.status).title;
        } else {
          state.message = "oops_problem_ocurred";
        }
      })
      .addMatcher(isAnyOf(fetchListingById.rejected), (state, action) => {
        state.showMessage = true;
        state.type = "danger";
        const response = action as PayloadAction<{
          status: number;
        }>;
        if (response.payload && response.payload.status) {
          state.message = getHttpErrorMessage(response.payload.status).title;
        } else {
          state.message = "oops_problem_ocurred";
        }
      })
      .addMatcher(isAnyOf(createListing.fulfilled), state => {
        state.showMessage = true;
        state.type = "success";
        state.message = "successful_operation";
      })
      .addMatcher(isAnyOf(createListing.rejected), (state, action) => {
        state.showMessage = true;
        state.type = "danger";
        const response = action as PayloadAction<{
          status: number;
        }>;
        if (response.payload && response.payload.status) {
          state.message = getHttpErrorMessage(response.payload.status).title;
        } else {
          state.message = "oops_problem_ocurred";
        }
      })
      .addMatcher(isAnyOf(patchListing.fulfilled), state => {
        state.showMessage = true;
        state.type = "success";
        state.message = "successful_operation";
      })
      .addMatcher(isAnyOf(patchListing.rejected), (state, action) => {
        state.showMessage = true;
        state.type = "danger";
        const response = action as PayloadAction<{
          status: number;
        }>;
        if (response.payload && response.payload.status) {
          state.message = getHttpErrorMessage(response.payload.status).title;
        } else {
          state.message = "oops_problem_ocurred";
        }
      })
      .addMatcher(isAnyOf(deleteListing.fulfilled), state => {
        state.showMessage = true;
        state.type = "success";
        state.message = "successful_operation";
      })
      .addMatcher(isAnyOf(deleteListing.rejected), (state, action) => {
        state.showMessage = true;
        state.type = "danger";
        const response = action as PayloadAction<{
          status: number;
        }>;
        if (response.payload && response.payload.status) {
          state.message = getHttpErrorMessage(response.payload.status).title;
        } else {
          state.message = "oops_problem_ocurred";
        }
      });

    // REVIEW
    builder
      .addMatcher(isAnyOf(fetchReviewsByListing.rejected), (state, action) => {
        state.showMessage = true;
        state.type = "danger";
        const response = action as PayloadAction<{
          status: number;
        }>;
        if (response.payload && response.payload.status) {
          state.message = getHttpErrorMessage(response.payload.status).title;
        } else {
          state.message = "oops_problem_ocurred";
        }
      })
      .addMatcher(isAnyOf(fetchReviewById.rejected), (state, action) => {
        state.showMessage = true;
        state.type = "danger";
        const response = action as PayloadAction<{
          status: number;
        }>;
        if (response.payload && response.payload.status) {
          state.message = getHttpErrorMessage(response.payload.status).title;
        } else {
          state.message = "oops_problem_ocurred";
        }
      })
      .addMatcher(isAnyOf(createReview.rejected), (state, action) => {
        state.showMessage = true;
        state.type = "danger";
        const response = action as PayloadAction<{
          status: number;
        }>;
        if (response.payload && response.payload.status) {
          state.message = getHttpErrorMessage(response.payload.status).title;
        } else {
          state.message = "oops_problem_ocurred";
        }
      })
      .addMatcher(isAnyOf(patchReview.rejected), (state, action) => {
        state.showMessage = true;
        state.type = "danger";
        const response = action as PayloadAction<{
          status: number;
        }>;
        if (response.payload && response.payload.status) {
          state.message = getHttpErrorMessage(response.payload.status).title;
        } else {
          state.message = "oops_problem_ocurred";
        }
      })
      .addMatcher(isAnyOf(patchLikeReview.rejected), (state, action) => {
        state.showMessage = true;
        state.type = "danger";
        const response = action as PayloadAction<{
          status: number;
        }>;
        if (response.payload && response.payload.status) {
          state.message = getHttpErrorMessage(response.payload.status).title;
        } else {
          state.message = "oops_problem_ocurred";
        }
      })
      .addMatcher(isAnyOf(patchUnlikeReview.rejected), (state, action) => {
        state.showMessage = true;
        state.type = "danger";
        const response = action as PayloadAction<{
          status: number;
        }>;
        if (response.payload && response.payload.status) {
          state.message = getHttpErrorMessage(response.payload.status).title;
        } else {
          state.message = "oops_problem_ocurred";
        }
      });

    // IMAGE
    builder
      .addMatcher(isAnyOf(uploadProfileImage.rejected), (state, action) => {
        state.showMessage = true;
        state.type = "danger";
        const response = action as PayloadAction<{
          status: number;
        }>;
        if (response.payload && response.payload.status) {
          state.message = getHttpErrorMessage(response.payload.status).title;
        } else {
          state.message = "error_upload_profile_image";
        }
      })
      .addMatcher(isAnyOf(uploadProfileImage.fulfilled), state => {
        state.showMessage = true;
        state.type = "success";
        state.message = "successful_operation";
      })
      .addMatcher(isAnyOf(uploadListingImage.rejected), (state, action) => {
        state.showMessage = true;
        state.type = "danger";
        const response = action as PayloadAction<{
          status: number;
        }>;
        if (response.payload && response.payload.status) {
          state.message = getHttpErrorMessage(response.payload.status).title;
        } else {
          state.message = "error_upload_listing_image";
        }
      })
      .addMatcher(isAnyOf(uploadListingImage.fulfilled), state => {
        state.showMessage = true;
        state.type = "success";
        state.message = "successful_operation";
      })
      .addMatcher(isAnyOf(uploadNewListingImage.rejected), (state, action) => {
        state.showMessage = true;
        state.type = "danger";
        const response = action as PayloadAction<{
          status: number;
        }>;
        if (response.payload && response.payload.status) {
          state.message = getHttpErrorMessage(response.payload.status).title;
        } else {
          state.message = "error_upload_new_listing_image";
        }
      })
      .addMatcher(isAnyOf(uploadNewListingImage.fulfilled), state => {
        state.showMessage = true;
        state.type = "success";
        state.message = "successful_operation";
      })
      .addMatcher(isAnyOf(deleteProfileImage.rejected), (state, action) => {
        state.showMessage = true;
        state.type = "danger";
        const response = action as PayloadAction<{
          status: number;
        }>;
        if (response.payload && response.payload.status) {
          state.message = getHttpErrorMessage(response.payload.status).title;
        } else {
          state.message = "error_delete_profile_image";
        }
      })
      .addMatcher(isAnyOf(deleteListingImage.rejected), (state, action) => {
        state.showMessage = true;
        state.type = "danger";
        const response = action as PayloadAction<{
          status: number;
        }>;
        if (response.payload && response.payload.status) {
          state.message = getHttpErrorMessage(response.payload.status).title;
        } else {
          state.message = "error_delete_listing_image";
        }
      })
      .addMatcher(isAnyOf(moveListingImages.rejected), (state, action) => {
        state.showMessage = true;
        state.type = "danger";
        const response = action as PayloadAction<{
          status: number;
        }>;
        if (response.payload && response.payload.status) {
          state.message = getHttpErrorMessage(response.payload.status).title;
        } else {
          state.message = "error_move_listing_images";
        }
      });
  },
});

export const { setMessage, cleanMessage } = alertSlice.actions;

export default alertSlice.reducer;
