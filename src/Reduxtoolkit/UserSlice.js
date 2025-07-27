import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const BooksDetails = createAsyncThunk(
  "BooksDetails",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:3000/books/addbooks", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const booksData = createSlice({
  name: "bookStore",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(BooksDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(BooksDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(BooksDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default booksData.reducer;
