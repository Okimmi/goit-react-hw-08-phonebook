import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Box, Container, Snackbar } from '@mui/material';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { Contacts } from 'components/Contacts/Contacts';
import {
  selectContacts,
  selectEditContact,
  selectEditContactData,
  selectError,
  selectErrorNotify,
} from 'redux/contacts/selectors';
import { addContact, editContact } from 'redux/contacts/operations';
import { addStyle, editStyle } from 'components/ContactForm/boxStyle';
import { closeEditModal } from 'redux/contacts/contactsSlice';
import { EditModal } from 'components/EditModal/EditModal';

export const ContactsPage = () => {
  const dispatch = useDispatch();

  const isError = useSelector(selectError);
  const errorNotify = useSelector(selectErrorNotify);
  const contacts = useSelector(selectContacts);
  const editContactData = useSelector(selectEditContactData);
  const editContactId = useSelector(selectEditContact);

  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (isError) {
      setOpenSnackbar(true);
    }
  }, [isError]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  const isAlreadyExists = inputName => {
    return contacts.some(({ name }) => name === inputName);
  };

  const onAddContact = (values, actions) => {
    if (isAlreadyExists(values.name)) {
      window.alert(values.name + ' is already in contacts.');
    } else {
      dispatch(addContact(values));
      actions.resetForm();
    }
  };

  const onEditContact = values => {
    if (
      editContactData[0].name !== values.name &&
      isAlreadyExists(values.name)
    ) {
      window.alert(values.name + ' is already in contacts.');
    } else {
      dispatch(editContact({ id: editContactId, contact: values }));
      dispatch(closeEditModal());
    }
  };

  return (
    <Container
      sx={{
        pt: 4,
      }}
    >
      <h1>Phonebook</h1>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 4,
          pt: 4,
        }}
      >
        <ContactForm
          initialValues={{
            name: '',
            number: '',
          }}
          onSubmit={onAddContact}
          style={addStyle}
        >
          Add contact
        </ContactForm>
        <Contacts></Contacts>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity="error" onClose={handleClose}>
          {errorNotify}
        </Alert>
      </Snackbar>
      {editContactId && (
        <EditModal>
          <ContactForm
            initialValues={{
              name: editContactData[0]?.name,
              number: editContactData[0]?.number,
            }}
            onSubmit={onEditContact}
            style={editStyle}
          >
            Save
          </ContactForm>
        </EditModal>
      )}
    </Container>
  );
};
