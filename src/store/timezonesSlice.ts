import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface Timezone {
  city: string;
  offset: number;
}

interface TimezonesState {
  data: Timezone[];
  loading: boolean;
  error: string | null;
  selectedCities: Timezone[];
}

const initialState: TimezonesState = {
  data: [],
  loading: false,
  error: null,
  selectedCities: [],
};

export const fetchTimezones = createAsyncThunk<Timezone[], void>(
  "timezomes/fetchTimezones",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/timezones.json");
      if (!response) throw new Error("data fetch error");
      return response.json();
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "dara fetch error catched"
      );
    }
  }
);

const timezonesSlice = createSlice({
  name: "timezones",
  initialState,
  reducers: {
    addCity: (state, action) => {
      const { city, offset } = action.payload;
      if (state.selectedCities.length < 10) {
        state.selectedCities.push({ city, offset });
      }
    },
    removeCity: (state, action) => {
      const city = action.payload;
      state.selectedCities = state.selectedCities.filter(
        (i) => i.city !== city
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTimezones.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTimezones.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchTimezones.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export const { addCity, removeCity } = timezonesSlice.actions;

export default timezonesSlice.reducer;
