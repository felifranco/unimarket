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
  async ({
    token,
    id_publicacion,
  }: {
    token: string;
    id_publicacion: number;
  }) => {
    const response = await get(
      `${REVIEW_SERVICE}/${endpoint}/review/${id_publicacion}`,
      {
        Authorization: `Bearer ${token}`,
      },
    );
    return response;
  },
);

export const fetchReviewById = createAsyncThunk(
  "reviews/fetchReviewById",
  async ({ token, id }: { token: string; id: number }) => {
    const response = await get(`${REVIEW_SERVICE}/${endpoint}/${id}`, {
      Authorization: `Bearer ${token}`,
    });
    return response;
  },
);

export const createReview = createAsyncThunk(
  "reviews/createReview",
  async ({ token, review }: { token: string; review: reviewInterface }) => {
    const response = await post(`${REVIEW_SERVICE}/${endpoint}`, review, {
      Authorization: `Bearer ${token}`,
    });
    return response;
  },
);

export const patchReview = createAsyncThunk(
  "reviews/patchReview",
  async ({ token, review }: { token: string; review: reviewInterface }) => {
    const response = await patch(
      `${REVIEW_SERVICE}/${endpoint}/${review.id_publicacion}`,
      review,
      {
        Authorization: `Bearer ${token}`,
      },
    );
    return response;
  },
);

export const patchLikeReview = createAsyncThunk(
  "reviews/patchLikeReview",
  async ({
    token,
    id_publicacion,
  }: {
    token: string;
    id_publicacion: number;
  }) => {
    const response = await patch(
      `${REVIEW_SERVICE}/${endpoint}/like/${id_publicacion}`,
      {},
      {
        Authorization: `Bearer ${token}`,
      },
    );
    return response;
  },
);

export const patchUnlikeReview = createAsyncThunk(
  "reviews/patchUnlikeReview",
  async ({
    token,
    id_publicacion,
  }: {
    token: string;
    id_publicacion: number;
  }) => {
    const response = await patch(
      `${REVIEW_SERVICE}/${endpoint}/unlike/${id_publicacion}`,
      {},
      {
        Authorization: `Bearer ${token}`,
      },
    );
    return response;
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
