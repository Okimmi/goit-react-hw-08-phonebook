import { ContactForm } from './ContactForm/ContactForm';
import { Toaster, toast } from 'react-hot-toast';
import { Contacts } from './Contacts/Contacts';
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout';
import { Filter } from './Filter/Filter';
import { useSelector } from 'react-redux';
import { selectError, selectErrorNotify, selectLoading } from 'redux/selectors';
import { Loader } from './Loader/Loader';
import { useEffect } from 'react';

export const App = () => {
  const isLoading = useSelector(selectLoading);
  const isError = useSelector(selectError);
  const errorNotify = useSelector(selectErrorNotify);

  useEffect(() => {
    if (isError) {
      toast.error(errorNotify);
    }
  }, [isError, errorNotify]);

  return (
    <Layout>
      <h1>Phonebook</h1>
      <ContactForm></ContactForm>
      <h2>Contacts</h2>
      <Filter></Filter>
      <Contacts></Contacts>
      {isLoading && <Loader />}
      <Toaster />
      <GlobalStyle></GlobalStyle>
    </Layout>
  );
};
