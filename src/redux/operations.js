import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://651ef13844a3a8aa47693bec.mockapi.io';

export const fetchAll = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/contacts`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.config.method);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact, thunkAPI) => {
    try {
      await axios.post(`${BASE_URL}/contacts`, contact);
      const response = await axios.get(`${BASE_URL}/contacts`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.config.method);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkAPI) => {
    try {
      await axios.delete(`${BASE_URL}/contacts/${id}`);
      const response = await axios.get(`${BASE_URL}/contacts`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.config.method);
    }
  }
);
