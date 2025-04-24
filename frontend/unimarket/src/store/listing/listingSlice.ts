import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { service } from "../../config/configurations";
import { get, post, patch, put, del } from "../../utils/axios.util";
import { ApiResponse } from "../../utils/apiResponse.util";
import { listingInterface } from "../../interfaces/listings";
import { PURGE } from "redux-persist";

const LISTING_SERVICE = service.LISTING_SERVICE;

const endpoint = "listings";

interface ListingState {
  listings: Array<listingInterface> | [];
  myListings: Array<listingInterface> | [];
  listing: listingInterface | object;
  loading: boolean;
  error: string | null;
}
const initialState: ListingState = {
  listings: [],
  myListings: [],
  listing: {},
  loading: false,
  error: null,
};

export const fetchListings = createAsyncThunk(
  "listings/fetchListings",
  async (token: string) => {
    const response = await get(`${LISTING_SERVICE}/${endpoint}`, {
      Authorization: `Bearer ${token}`,
    });
    return response;
  },
);

export const fetchMyListings = createAsyncThunk(
  "listings/fetchMyListings",
  async (data: { token: string; id_usuario: number }) => {
    const response = await get(
      `${LISTING_SERVICE}/${endpoint}/user/${data.id_usuario}`,
      {
        Authorization: `Bearer ${data.token}`,
      },
    );
    return response;
  },
);

export const fetchListingById = createAsyncThunk(
  "listings/fetchListingById",
  async (data: { token: string; id: number }) => {
    const response = await get(`${LISTING_SERVICE}/${endpoint}/${data.id}`, {
      Authorization: `Bearer ${data.token}`,
    });
    return response;
  },
);

export const createListing = createAsyncThunk(
  "listings/createListing",
  async (data: { token: string; listing: listingInterface }) => {
    const response = await post(
      `${LISTING_SERVICE}/${endpoint}`,
      data.listing,
      {
        Authorization: `Bearer ${data.token}`,
      },
    );
    return response;
  },
);

export const updateListing = createAsyncThunk(
  "listings/updateListing",
  async (data: { token: string; listing: listingInterface }) => {
    const response = await put(
      `${LISTING_SERVICE}/${endpoint}/${data.listing.id_publicacion}`,
      data.listing,
      {
        Authorization: `Bearer ${data.token}`,
      },
    );
    return response;
  },
);

export const patchListing = createAsyncThunk(
  "listings/patchListing",
  async (data: { token: string; listing: listingInterface }) => {
    const response = await patch(
      `${LISTING_SERVICE}/${endpoint}/${data.listing.id_publicacion}`,
      data.listing,
      {
        Authorization: `Bearer ${data.token}`,
      },
    );
    return response;
  },
);

export const deleteListing = createAsyncThunk(
  "listings/deleteListing",
  async (data: { token: string; id: number }) => {
    const response = await del(`${LISTING_SERVICE}/${endpoint}/${data.id}`, {
      Authorization: `Bearer ${data.token}`,
    });
    return response;
  },
);

export const listingSlice = createSlice({
  name: "listing",
  initialState,
  reducers: {
    clearListing: state => {
      state.listing = {};
    },
  },
  extraReducers: builder => {
    // Fetch listings
    builder
      .addCase(fetchListings.pending, state => {
        state.loading = true;
      })
      .addCase(
        fetchListings.fulfilled,
        (
          state,
          action: PayloadAction<ApiResponse<Array<listingInterface>>>,
        ) => {
          const response = action.payload as ApiResponse<
            Array<listingInterface>
          >;

          state.listings = response.data || [];
          state.loading = false;
        },
      )
      .addCase(fetchListings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch listings";
      })

      // Fetch my listings
      .addCase(fetchMyListings.pending, state => {
        state.loading = true;
      })
      .addCase(
        fetchMyListings.fulfilled,
        (
          state,
          action: PayloadAction<ApiResponse<Array<listingInterface>>>,
        ) => {
          const response = action.payload as ApiResponse<
            Array<listingInterface>
          >;

          state.myListings = response.data || [];
          state.loading = false;
        },
      )
      .addCase(fetchMyListings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch listings";
      })

      // Fetch listing by ID
      .addCase(
        fetchListingById.fulfilled,
        (state, action: PayloadAction<ApiResponse<unknown>>) => {
          const response = action.payload as ApiResponse<listingInterface>;
          state.listing = response.data || {};
        },
      )
      // Create listing
      .addCase(
        createListing.fulfilled,
        (state, action: PayloadAction<ApiResponse<unknown>>) => {
          const response = action.payload as ApiResponse<listingInterface>;
          state.listings.push(response.data);
        },
      )
      // Update listing
      .addCase(
        updateListing.fulfilled,
        (state, action: PayloadAction<ApiResponse<unknown>>) => {
          const response = action.payload as ApiResponse<listingInterface>;
          const index = state.listings.findIndex(
            listing => listing.id === response.data.id,
          );
          if (index !== -1) {
            state.listings[index] = response.data;
          }
        },
      )
      // Delete listing
      .addCase(
        deleteListing.fulfilled,
        (state, action: PayloadAction<ApiResponse<unknown>>) => {
          const response = action.payload as ApiResponse<any>;
          state.listings = state.listings.filter(
            listing => listing.id !== response.data.id,
          );
        },
      )

      .addCase(PURGE, () => initialState);
  },
});
export const { clearListing } = listingSlice.actions;
export default listingSlice.reducer;
