import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { service } from "../../config/configurations";
import { post, del, put } from "../../utils/axios.util";
import { ApiResponse } from "../../utils/apiResponse.util";

const IMAGE_SERVICE = service.IMAGE_SERVICE;
const endpoint = "images";
interface ImageState {
  url: string;
  loading: boolean;
  error: string | null;
}

const initialState: ImageState = {
  url: "",
  loading: false,
  error: null,
};

export const uploadProfileImage = createAsyncThunk(
  "image/uploadProfileImage",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await post(
        `${IMAGE_SERVICE}/${endpoint}/profile`,
        formData,
        {
          "Content-Type": "multipart/form-data",
        },
      );
      return response;
    } catch (error: unknown) {
      return rejectWithValue({
        status: (error as { response?: { status: number } }).response?.status,
      });
    }
  },
);

export const uploadListingImage = createAsyncThunk(
  "image/uploadListingImage",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await post(
        `${IMAGE_SERVICE}/${endpoint}/listings`,
        formData,
        {
          "Content-Type": "multipart/form-data",
        },
      );
      return response;
    } catch (error: unknown) {
      return rejectWithValue({
        status: (error as { response?: { status: number } }).response?.status,
      });
    }
  },
);

export const uploadNewListingImage = createAsyncThunk(
  "image/uploadNewListingImage",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await post(
        `${IMAGE_SERVICE}/${endpoint}/listings/new`,
        formData,
        {
          "Content-Type": "multipart/form-data",
        },
      );
      return response;
    } catch (error: unknown) {
      return rejectWithValue({
        status: (error as { response?: { status: number } }).response?.status,
      });
    }
  },
);

export const deleteProfileImage = createAsyncThunk(
  "image/deleteProfileImage",
  async (
    { uuid, filename }: { uuid: string; filename: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await del(
        `${IMAGE_SERVICE}/${endpoint}/profile/${uuid}?filename=${encodeURIComponent(filename)}`,
      );
      return response;
    } catch (error: unknown) {
      return rejectWithValue({
        status: (error as { response?: { status: number } }).response?.status,
      });
    }
  },
);

export const deleteListingImage = createAsyncThunk(
  "image/deleteListingImage",
  async (
    {
      uuid,
      listingUuid,
      filename,
    }: { uuid: string; listingUuid: string; filename: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await del(
        `${IMAGE_SERVICE}/${endpoint}/listings/${uuid}?listingUuid=${encodeURIComponent(listingUuid)}&filename=${encodeURIComponent(filename)}`,
      );
      return response;
    } catch (error: unknown) {
      return rejectWithValue({
        status: (error as { response?: { status: number } }).response?.status,
      });
    }
  },
);

export const moveListingImages = createAsyncThunk(
  "image/moveListingImages",
  async (
    { uuid, listingUuid }: { uuid: string; listingUuid: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await put(
        `${IMAGE_SERVICE}/${endpoint}/listings/new?uuid=${encodeURIComponent(uuid)}&listingUuid=${encodeURIComponent(listingUuid)}`,
        {}, // PUT sin body
      );
      return response;
    } catch (error: unknown) {
      return rejectWithValue({
        status: (error as { response?: { status: number } }).response?.status,
      });
    }
  },
);

export const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    resetImageState: () => initialState,
  },
  extraReducers: builder => {
    builder
      // Upload Profile Image
      .addCase(
        uploadProfileImage.fulfilled,
        (state, action: PayloadAction<ApiResponse<unknown>>) => {
          const response = action.payload as ApiResponse<{ url: string }>;
          state.url = response.data?.url || "";
          state.loading = false;
          state.error = null;
        },
      )
      .addCase(uploadProfileImage.pending, state => {
        state.loading = true;
      })
      // Upload Listing Image
      .addCase(
        uploadListingImage.fulfilled,
        (state, action: PayloadAction<ApiResponse<unknown>>) => {
          const response = action.payload as ApiResponse<{ url: string }>;
          state.url = response.data?.url || "";
          state.loading = false;
          state.error = null;
        },
      )
      .addCase(uploadListingImage.pending, state => {
        state.loading = true;
      })
      // Upload New Listing Image
      .addCase(
        uploadNewListingImage.fulfilled,
        (state, action: PayloadAction<ApiResponse<unknown>>) => {
          const response = action.payload as ApiResponse<{ url: string }>;
          state.url = response.data?.url || "";
          state.loading = false;
          state.error = null;
        },
      )
      .addCase(uploadNewListingImage.pending, state => {
        state.loading = true;
      })
      // Delete Profile Image
      .addCase(deleteProfileImage.fulfilled, state => {
        state.url = "";
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteProfileImage.pending, state => {
        state.loading = true;
      })
      // Delete Listing Image
      .addCase(deleteListingImage.fulfilled, state => {
        state.url = "";
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteListingImage.pending, state => {
        state.loading = true;
      })
      // Move Listing Images
      .addCase(moveListingImages.fulfilled, state => {
        state.loading = false;
        state.error = null;
      })
      .addCase(moveListingImages.pending, state => {
        state.loading = true;
      });
  },
});

export const { resetImageState } = imageSlice.actions;
export default imageSlice.reducer;
