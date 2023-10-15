import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { red } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import { Box, IconButton, List, ListItemText } from '@mui/material';
import { Filter } from 'components/Filter/Filter';
import { selectFilteredContacts } from 'redux/contacts/selectors';
import { deleteContact, fetchAll } from 'redux/contacts/operations';
import { openEditModal } from 'redux/contacts/contactsSlice';

export const Contacts = () => {
  const dispatch = useDispatch();
  const filteredContacts = useSelector(selectFilteredContacts);
  const btnColor = red['A700'];

  useEffect(() => {
    dispatch(fetchAll());
  }, [dispatch]);

  return (
    <Box>
      <h2>Contacts</h2>
      <Filter></Filter>
      <List>
        {filteredContacts.map(({ name, number, id }) => (
          <ListItemText key={id}>
            <IconButton
              edge="start"
              aria-label="delete"
              sx={{
                color: btnColor,
              }}
              onClick={() => dispatch(deleteContact(id))}
            >
              <RemoveCircleOutlineIcon />
            </IconButton>
            {name}: {number}
            <IconButton
              edge="end"
              aria-label="edit"
              onClick={() => dispatch(openEditModal(id))}
            >
              <EditIcon />
            </IconButton>
          </ListItemText>
        ))}
      </List>
    </Box>
  );
};
