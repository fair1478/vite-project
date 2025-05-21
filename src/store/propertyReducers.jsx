import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api"; // Adjust the import path as necessary

const initialState = {
  properties: [],
  tags: [],
  locations: [],
  loading: { locations: false, properties: false, tags: false },
  error: {
    locations: null,
    tags: null,
    properties: null,
  },
};

// Async action to get all properties
export const getAllProperties = createAsyncThunk(
  "property/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/properties");

      if (response.status === 200) {
        return response.data;
      }

      throw new Error(response.statusText);
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch all properties"
      );
    }
  }
);
// Async action to get properties by query string
export const getPropertiesByQuery = createAsyncThunk(
  "property/getByQuery",
  async (queryString, { rejectWithValue }) => {
    try {
      const response = await api.get("/properties", {
        params: {
          query: queryString,
        },
      });

      if (response.status === 200) {
        return response.data;
      }

      throw new Error(response.statusText);
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch properties by query"
      );
    }
  }
);

// Async action to create a property
export const createProperty = createAsyncThunk(
  "property/create",
  async (propertyData, { rejectWithValue }) => {
    try {
      const response = await api.post("/properties", propertyData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201) {
        return response.data;
      }

      throw new Error(response.statusText);
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to create property"
      );
    }
  }
);

// Async action to edit a property
export const editProperty = createAsyncThunk(
  "property/edit",
  async ({ id, propertyData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/properties/${id}`, propertyData);

      if (response.status === 200) {
        return response.data;
      }
      throw new Error(response.statusText);
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to edit property");
    }
  }
);

// Async action to delete a property
export const deleteProperty = createAsyncThunk(
  "property/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/properties/${id}`);

      if (response.status === 200) {
        return { id };
      }

      throw new Error(response.statusText);
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to delete property"
      );
    }
  }
);

export const getTags = createAsyncThunk(
  "property/getTags",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/tags");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getLocations = createAsyncThunk(
  "property/getLocations",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/locations");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Create slice for property reducer
const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get all properties
      .addCase(getAllProperties.pending, (state) => {
        state.loading.properties = true;
        state.error.properties = null;
      })
      .addCase(getAllProperties.fulfilled, (state, action) => {
        state.loading.properties = false;
        state.error.properties = null;
        state.properties = action.payload;
      })
      .addCase(getAllProperties.rejected, (state, action) => {
        state.loading.properties = false;
        state.error.properties =
          action.payload.error || "Failed to fetch all properties";
      })
      // Get properties by price range
      .addCase(getPropertiesByQuery.pending, (state) => {
        state.loading.properties = true;
        state.error.properties = null;
      })
      .addCase(getPropertiesByQuery.fulfilled, (state, action) => {
        state.loading.properties = false;
        state.error.properties = null;
        state.properties = action.payload;
      })
      .addCase(getPropertiesByQuery.rejected, (state, action) => {
        state.loading.properties = false;
        state.error.properties =
          action.payload.error || "Failed to fetch properties";
      })
      // Create property
      .addCase(createProperty.pending, (state) => {
        state.loading.properties = true;
        state.error.properties = null;
      })
      .addCase(createProperty.fulfilled, (state, action) => {
        state.loading.properties = false;
        state.error.properties = null;
      })
      .addCase(createProperty.rejected, (state, action) => {
        state.loading.properties = false;
        state.error.properties =
          action.payload.error || "Failed to create property";
      })
      // Edit property
      .addCase(editProperty.pending, (state) => {
        state.loading.properties = true;
        state.error.properties = null;
      })
      .addCase(editProperty.fulfilled, (state, action) => {
        state.loading.properties = false;
        state.error.properties = null;
      })
      .addCase(editProperty.rejected, (state, action) => {
        state.loading.properties = false;
        state.error.properties =
          action.payload.error || "Failed to edit property";
      })
      // Delete property
      .addCase(deleteProperty.pending, (state) => {
        state.loading.properties = true;
        state.error.properties = null;
      })
      .addCase(deleteProperty.fulfilled, (state) => {
        state.loading.properties = false;
        state.error.properties = null;
      })
      .addCase(deleteProperty.rejected, (state, action) => {
        state.loading.properties = false;
        state.error.properties =
          action.payload.error || "Failed to delete property";
      })
      .addCase(getTags.pending, (state) => {
        state.loading.tags = true;
        state.error.tags = null;
      })
      .addCase(getTags.fulfilled, (state, action) => {
        state.loading.tags = false;
        state.error.tags = null;
        state.tags = action.payload;
      })
      .addCase(getTags.rejected, (state, action) => {
        state.loading.tags = false;
        state.error.tags = action.payload.error || "Failed to fetch tags";
      })
      .addCase(getLocations.pending, (state) => {
        state.loading.locations = true;
        state.error.locations = null;
      })
      .addCase(getLocations.fulfilled, (state, action) => {
        state.loading.locations = false;
        state.error.locations = null;
        state.locations = action.payload;
      })
      .addCase(getLocations.rejected, (state, action) => {
        state.loading.locations = false;
        state.error.locations =
          action.payload.error || "Failed to fetch locations";
      });
  },
});

export const propertyReducer = propertySlice.reducer;
export default propertyReducer;
