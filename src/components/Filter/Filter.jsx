import { useDispatch } from 'react-redux';
import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { setFilter } from 'redux/contacts/filterSlice';

export const Filter = () => {
  const dispatch = useDispatch();

  return (
    <form>
      <TextField
        type="text"
        variant="outlined"
        size="small"
        placeholder="Find contacts by name"
        fullWidth
        onChange={e => dispatch(setFilter(e.target.value))}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
};
