import { createSelector } from '@reduxjs/toolkit';

export const selectContacts = state => state.contacts.items;
export const selectFilter = state => state.filter;
export const selectLoading = state => state.contacts.isLoading;
export const selectError = state => state.contacts.error;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) =>
    contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    )
);

const defaultApiActions = {
  get: 'get',
  post: 'post',
  delete: 'delete',
};

export const selectErrorNotify = createSelector([selectError], error => {
  switch (error) {
    case defaultApiActions.get:
      return 'An error occurred while communicating with the server. Please try again later.';
    case defaultApiActions.post:
      return 'Contact addition encountered an issue.';
    case defaultApiActions.delete:
      return 'Contact removal encountered an issue.';
    default:
      return;
  }
});
