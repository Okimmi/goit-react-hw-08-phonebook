import { Input, Wrapper } from './Filter.styled';
import { useDispatch } from 'react-redux';
import { setFilter } from 'redux/filterSlice';

export const Filter = () => {
  const dispatch = useDispatch();

  return (
    <form>
      <Wrapper>
        <span>Find contacts by name</span>
        <Input
          type="text"
          onChange={e => dispatch(setFilter(e.target.value))}
        />
      </Wrapper>
    </form>
  );
};
