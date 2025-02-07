import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface Timezone {
  city: string;
  offset: number;
}

interface ClockState {
  city: string;
  offset: number;
}

interface TimezonesState {
  data: Timezone[];
  loading: boolean;
  error: string | null;
  clocks: ClockState[];
}

const initialState: TimezonesState = {
  data: [],
  loading: false,
  error: null,
  clocks: [],
};

export const fetchTimezones = createAsyncThunk<Timezone[], void>(
  "timezones/fetchTimezones",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/timezones.json");
      if (!response.ok) throw new Error("Data fetch error");
      return await response.json();
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Data fetch error caught"
      );
    }
  }
);

const timezonesSlice = createSlice({
  name: "timezones",
  initialState,
  reducers: {
    addClock: (state, action: PayloadAction<string>) => {
      const city = action.payload || state.data[0]?.city; // default to the first city
      const timezone = state.data.find((tz) => tz.city === city);
      if (timezone) {
        state.clocks.push({ city, offset: timezone.offset });
      }
    },
    removeClock: (state, action) => {
      state.clocks.splice(action.payload, 1);
    },
    updateClockCity: (state, action) => {
      const { index, city } = action.payload;
      const timezone = state.data.find((tz) => tz.city === city);
      if (timezone) {
        state.clocks[index] = { city: timezone.city, offset: timezone.offset };
      }
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

export const { addClock, removeClock, updateClockCity } =
  timezonesSlice.actions;

export default timezonesSlice.reducer;
