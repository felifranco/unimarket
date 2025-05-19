import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { service } from "../../config/configurations";
import { get, post, patch, del } from "../../utils/axios.util";
import { ApiResponse } from "../../utils/apiResponse.util";
import { listingInterface } from "../../interfaces/listings.interfaces";
import { PURGE } from "redux-persist";

const LISTING_SERVICE = service.LISTING_SERVICE;

const endpoint = "listings";

interface ListingState {
  listings: Array<listingInterface> | [];
  myListings: Array<listingInterface> | [];
  listing: listingInterface;
  loading: boolean;
  error: string | null;
}

const emptyListing: listingInterface = {
  id_publicacion: -1,
  publicacion_uuid: undefined,
  id_usuario: 0,
  tipo_publicacion: undefined,
  titulo: undefined,
  descripcion_general: undefined,
  sku: undefined,
  categorias: undefined,
  ubicacion: undefined,
  estado: undefined,
  estrellas: 0,
  calificacion: 0,
  vendidos: 0,
  existencias: 0,
  descripcion_producto: undefined,
  simbolo_moneda: undefined,
  precio_anterior: 0,
  precio: 0,
  insignia: undefined,
  imagenes: undefined,
  imagen_portada: undefined,
  fecha_creacion: undefined,
  fecha_modificacion: undefined,
};

const initialState: ListingState = {
  listings: [],
  myListings: [],
  listing: emptyListing,
  loading: false,
  error: null,
};

export const fetchListings = createAsyncThunk(
  "listings/fetchListings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await get(`${LISTING_SERVICE}/${endpoint}`);
      return response;
    } catch (error: unknown) {
      return rejectWithValue({
        status: (error as { response?: { status: number } }).response?.status,
      });
    }
  },
);

export const fetchMyListings = createAsyncThunk(
  "listings/fetchMyListings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await get(`${LISTING_SERVICE}/${endpoint}/mine`);
      return response;
    } catch (error: unknown) {
      return rejectWithValue({
        status: (error as { response?: { status: number } }).response?.status,
      });
    }
  },
);

export const fetchListingsByUser = createAsyncThunk(
  "listings/fetchListingsByUser",
  async ({ id_usuario }: { id_usuario: number }, { rejectWithValue }) => {
    try {
      const response = await get(
        `${LISTING_SERVICE}/${endpoint}/user/${id_usuario}`,
      );
      return response;
    } catch (error: unknown) {
      return rejectWithValue({
        status: (error as { response?: { status: number } }).response?.status,
      });
    }
  },
);

export const fetchListingById = createAsyncThunk(
  "listings/fetchListingById",
  async (
    { id_publicacion }: { id_publicacion: number },
    { rejectWithValue },
  ) => {
    try {
      const response = await get(
        `${LISTING_SERVICE}/${endpoint}/${id_publicacion}`,
      );
      return response;
    } catch (error: unknown) {
      return rejectWithValue({
        status: (error as { response?: { status: number } }).response?.status,
      });
    }
  },
);

export const createListing = createAsyncThunk(
  "listings/createListing",
  async ({ listing }: { listing: listingInterface }, { rejectWithValue }) => {
    try {
      const response = await post(`${LISTING_SERVICE}/${endpoint}`, listing);
      return response;
    } catch (error: unknown) {
      return rejectWithValue({
        status: (error as { response?: { status: number } }).response?.status,
      });
    }
  },
);

export const patchListing = createAsyncThunk(
  "listings/patchListing",
  async ({ listing }: { listing: listingInterface }, { rejectWithValue }) => {
    try {
      const response = await patch(
        `${LISTING_SERVICE}/${endpoint}/${listing.id_publicacion}`,
        listing,
      );
      return response;
    } catch (error: unknown) {
      return rejectWithValue({
        status: (error as { response?: { status: number } }).response?.status,
      });
    }
  },
);

export const deleteListing = createAsyncThunk(
  "listings/deleteListing",
  async (
    { id_publicacion }: { id_publicacion: number },
    { rejectWithValue },
  ) => {
    try {
      const response = await del(
        `${LISTING_SERVICE}/${endpoint}/${id_publicacion}`,
      );
      return response;
    } catch (error: unknown) {
      return rejectWithValue({
        status: (error as { response?: { status: number } }).response?.status,
      });
    }
  },
);

export const listingSlice = createSlice({
  name: "listing",
  initialState,
  reducers: {
    clearListing: state => {
      state.listing = emptyListing;
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
        (state, action: PayloadAction<ApiResponse<unknown>>) => {
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
        (state, action: PayloadAction<ApiResponse<unknown>>) => {
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

      // Fetch listings by user
      .addCase(fetchListingsByUser.pending, state => {
        state.loading = true;
      })
      .addCase(
        fetchListingsByUser.fulfilled,
        (state, action: PayloadAction<ApiResponse<unknown>>) => {
          const response = action.payload as ApiResponse<
            Array<listingInterface>
          >;

          state.listings = response.data || [];
          state.loading = false;
        },
      )
      .addCase(fetchListingsByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch listings";
      })

      // Fetch listing by ID
      .addCase(
        fetchListingById.fulfilled,
        (state, action: PayloadAction<ApiResponse<unknown>>) => {
          const response = action.payload as ApiResponse<listingInterface>;
          state.listing = response.data || <listingInterface>{};
        },
      )
      // Create listing
      .addCase(
        createListing.fulfilled,
        (state, action: PayloadAction<ApiResponse<unknown>>) => {
          const response = action.payload as ApiResponse<listingInterface>;
          state.listing = response.data || <listingInterface>{};
        },
      )
      // Patch listing
      .addCase(
        patchListing.fulfilled,
        (state, action: PayloadAction<ApiResponse<unknown>>) => {
          const response = action.payload as ApiResponse<listingInterface>;
          state.listing = response.data || <listingInterface>{};
        },
      )
      // Delete listing
      .addCase(deleteListing.fulfilled, (state /*action*/) => {
        state.listings = [];
      })

      .addCase(PURGE, () => initialState);
  },
});
export const { clearListing } = listingSlice.actions;
export default listingSlice.reducer;
