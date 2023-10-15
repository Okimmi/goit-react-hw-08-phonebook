import { useDispatch, useSelector } from 'react-redux';
import Modal from '@mui/material/Modal';
import { selectEditContact } from 'redux/contacts/selectors';
import { closeEditModal } from 'redux/contacts/contactsSlice';

export const EditModal = ({ children }) => {
  const dispatch = useDispatch();
  const editContactId = useSelector(selectEditContact);

  return (
    <div>
      <Modal
        open={Boolean(editContactId)}
        onClose={() => dispatch(closeEditModal())}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {children}
      </Modal>
    </div>
  );
};
