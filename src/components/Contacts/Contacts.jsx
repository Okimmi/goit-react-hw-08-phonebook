import { MdOutlineRemoveCircleOutline } from 'react-icons/md';

import { Btn, List, ListItem } from './Contacts.styled';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { deleteContact, fetchAll } from 'redux/operations';
import { selectFilteredContacts } from 'redux/selectors';

export const Contacts = () => {
  const dispatch = useDispatch();
  const filteredContacts = useSelector(selectFilteredContacts);

  useEffect(() => {
    dispatch(fetchAll());
  }, [dispatch]);

  return (
    <List>
      {filteredContacts.map(({ name, number, id }) => (
        <ListItem key={id}>
          <Btn onClick={() => dispatch(deleteContact(id))}>
            <MdOutlineRemoveCircleOutline size="24" />
          </Btn>
          {name}: {number}
        </ListItem>
      ))}
    </List>
  );
};
