import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { service } from "../../config/configurations";
import { get, post, patch } from "../../utils/axios.util";
import { ApiResponse } from "../../utils/apiResponse.util";
import { reviewInterface } from "../../interfaces/reviews.interface";
import { PURGE } from "redux-persist";

const REVIEW_SERVICE = service.REVIEW_SERVICE;

const endpoint = "reviews";

interface ReviewState {
  reviews: Array<reviewInterface> | [];
  loading: boolean;
  error: string | null;
}

const initialState: ReviewState = {
  reviews: [],
  loading: false,
  error: null,
};

export const fetchReviewsByListing = createAsyncThunk(
  "reviews/fetchReviewsByListing",
  async (
    { id_publicacion }: { id_publicacion: number },
    { rejectWithValue },
  ) => {
    try {
      const response = await get(
        `${REVIEW_SERVICE}/${endpoint}/listing/${id_publicacion}`,
      );
      return response;
    } catch (error: unknown) {
      return rejectWithValue({
        status: (error as { response?: { status: number } }).response?.status,
      });
    }
  },
);

export const fetchReviewById = createAsyncThunk(
  "reviews/fetchReviewById",
  async ({ id }: { id: number }, { rejectWithValue }) => {
    try {
      const response = await get(`${REVIEW_SERVICE}/${endpoint}/${id}`);
      return response;
    } catch (error: unknown) {
      return rejectWithValue({
        status: (error as { response?: { status: number } }).response?.status,
      });
    }
  },
);

export const createReview = createAsyncThunk(
  "reviews/createReview",
  async ({ review }: { review: reviewInterface }, { rejectWithValue }) => {
    try {
      const response = await post(`${REVIEW_SERVICE}/${endpoint}`, review);
      return response;
    } catch (error: unknown) {
      return rejectWithValue({
        status: (error as { response?: { status: number } }).response?.status,
      });
    }
  },
);

export const patchReview = createAsyncThunk(
  "reviews/patchReview",
  async ({ review }: { review: reviewInterface }, { rejectWithValue }) => {
    try {
      const response = await patch(
        `${REVIEW_SERVICE}/${endpoint}/${review.id_publicacion}`,
        review,
      );
      return response;
    } catch (error: unknown) {
      return rejectWithValue({
        status: (error as { response?: { status: number } }).response?.status,
      });
    }
  },
);

export const patchLikeReview = createAsyncThunk(
  "reviews/patchLikeReview",
  async (
    { id_publicacion }: { id_publicacion: number },
    { rejectWithValue },
  ) => {
    try {
      const response = await patch(
        `${REVIEW_SERVICE}/${endpoint}/like/${id_publicacion}`,
        {},
      );
      return response;
    } catch (error: unknown) {
      return rejectWithValue({
        status: (error as { response?: { status: number } }).response?.status,
      });
    }
  },
);

export const patchUnlikeReview = createAsyncThunk(
  "reviews/patchUnlikeReview",
  async (
    { id_publicacion }: { id_publicacion: number },
    { rejectWithValue },
  ) => {
    try {
      const response = await patch(
        `${REVIEW_SERVICE}/${endpoint}/unlike/${id_publicacion}`,
        {},
      );
      return response;
    } catch (error: unknown) {
      return rejectWithValue({
        status: (error as { response?: { status: number } }).response?.status,
      });
    }
  },
);

export const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: builder => {
    // Fetch reviews
    builder
      .addCase(fetchReviewsByListing.pending, state => {
        state.loading = true;
      })
      .addCase(
        fetchReviewsByListing.fulfilled,
        (state, action: PayloadAction<ApiResponse<unknown>>) => {
          const response = action.payload as ApiResponse<
            Array<reviewInterface>
          >;

          state.reviews = response.data || [];
          state.loading = false;
        },
      )
      .addCase(fetchReviewsByListing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch reviews";
      })

      // Create review
      .addCase(
        createReview.fulfilled,
        (state, action: PayloadAction<ApiResponse<unknown>>) => {
          const response = action.payload as ApiResponse<reviewInterface>;
          console.log("Review creada:", state, response);
        },
      )
      // Patch review
      //.addCase(
      //  patchListing.fulfilled,
      //  (state, action: PayloadAction<ApiResponse<reviewInterface>>) => {
      //    const response = action.payload;
      //    state.review = response.data || <reviewInterface>{};
      //  },
      //)
      // Patch Like review
      //.addCase(
      //  patchLikeReview.fulfilled,
      //  (state, action: PayloadAction<ApiResponse<reviewInterface>>) => {
      //    const response = action.payload as ApiResponse<reviewInterface>;
      //    console.log("patchLikeReview", state, response);
      //  },
      //)
      // Patch Unlike review
      //.addCase(
      //  patchUnlikeReview.fulfilled,
      //  (state, action: PayloadAction<ApiResponse<reviewInterface>>) => {
      //    const response = action.payload as ApiResponse<reviewInterface>;
      //    console.log("patchUnlikeReview", state, response);
      //  },
      //)

      .addCase(PURGE, () => initialState);
  },
});

export default reviewSlice.reducer;
