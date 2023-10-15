import { addContact, deleteContact, editContact, fetchAll } from './operations';

const { createSlice, isAnyOf } = require('@reduxjs/toolkit');

const defaultStatus = {
  pending: 'pending',
  fulfilled: 'fulfilled',
  rejected: 'rejected',
};

const initialState = {
  items: [],
  isLoading: false,
  error: null,
  editContact: null,
};

const actionsArr = [fetchAll, addContact, deleteContact, editContact];

const getActionsStatusArr = status => {
  return actionsArr.map(el => el[status]);
};

const handlePending = state => {
  state.isLoading = true;
};

const handleFulfilled = (state, action) => {
  state.isLoading = false;
  state.error = null;
  state.items = action.payload;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    openEditModal(state, action) {
      state.editContact = action.payload;
    },
    closeEditModal(state) {
      state.editContact = null;
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(
        isAnyOf(...getActionsStatusArr(defaultStatus.pending)),
        handlePending
      )
      .addMatcher(
        isAnyOf(...getActionsStatusArr(defaultStatus.fulfilled)),
        handleFulfilled
      )
      .addMatcher(
        isAnyOf(...getActionsStatusArr(defaultStatus.rejected)),
        handleRejected
      );
  },
});

export const { openEditModal, closeEditModal } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
