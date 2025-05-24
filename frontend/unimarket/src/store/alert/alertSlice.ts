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
import {
  fetchConversations,
  fetchConversationById,
  createConversation,
  createMessage,
  patchMessage,
  deleteMessage,
} from "../chat/chatSlice";
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

    // REJECTED
    builder.addMatcher(
      isAnyOf(
        // LOGIN - REGISTER - ME
        login.rejected,
        register.rejected,
        //me.rejected,
        // USERS
        fetchUsers.rejected,
        fetchUserById.rejected,
        patchUser.rejected,
        // LISTING
        fetchListings.rejected,
        fetchMyListings.rejected,
        fetchListingsByUser.rejected,
        fetchListingById.rejected,
        createListing.rejected,
        patchListing.rejected,
        deleteListing.rejected,
        // REVIEW
        fetchReviewsByListing.rejected,
        fetchReviewById.rejected,
        createReview.rejected,
        patchReview.rejected,
        patchLikeReview.rejected,
        patchUnlikeReview.rejected,
        // IMAGE
        uploadProfileImage.rejected,
        uploadListingImage.rejected,
        uploadNewListingImage.rejected,
        deleteProfileImage.rejected,
        deleteListingImage.rejected,
        moveListingImages.rejected,
        // CHAT (Conversaciones y Mensajes)
        // Conversaciones
        fetchConversations.rejected,
        fetchConversationById.rejected,
        createConversation.rejected,
        // Mensajes
        createMessage.rejected,
        patchMessage.rejected,
        deleteMessage.rejected,
      ),
      (state, action) => {
        const response = action as PayloadAction<{
          status: number;
        }>;
        state.showMessage = true;
        state.type = "danger";
        if (response.payload && response.payload.status) {
          state.message = getHttpErrorMessage(response.payload.status).title;
        } else {
          // Mensaje específico por acción
          switch (action.type) {
            case fetchConversations.rejected.type:
              state.message = "No se pudieron cargar las conversaciones";
              break;
            case fetchConversationById.rejected.type:
              state.message = "No se pudo cargar la conversación";
              break;
            case createConversation.rejected.type:
              state.message = "No se pudo crear la conversación";
              break;
            case createMessage.rejected.type:
              state.message = "No se pudo enviar el mensaje";
              break;
            case patchMessage.rejected.type:
              state.message = "No se pudo actualizar el mensaje";
              break;
            case deleteMessage.rejected.type:
              state.message = "No se pudo eliminar el mensaje";
              break;
            default:
              state.message = "oops_problem_ocurred";
          }
        }
      },
    );

    builder.addMatcher(
      isAnyOf(
        register.fulfilled,
        me.fulfilled,
        // USERS
        patchUser.fulfilled,
        // LISTING
        createListing.fulfilled,
        patchListing.fulfilled,
        deleteListing.fulfilled,
        // IMAGE
        uploadProfileImage.fulfilled,
        uploadListingImage.fulfilled,
        uploadNewListingImage.fulfilled,
      ),
      (state, action) => {
        state.showMessage = true;
        state.type = "success";
        switch (action.type) {
          case register.fulfilled.type:
            state.message = "successfully_registered";
            break;

          case me.fulfilled.type:
            state.message = "welcome";
            break;

          default:
            state.message = "successful_operation";
            break;
        }
      },
    );
  },
});

export const { setMessage, cleanMessage } = alertSlice.actions;

export default alertSlice.reducer;
