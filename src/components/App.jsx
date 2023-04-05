import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import css from './App.module.css';

const App = () => {
  const [contacts, setContacts] = useState(() => onReadFromLocalStorage());
  const [filter, setFilter] = useState('');
  
  useEffect(()=>{localStorage.setItem('phonebook', JSON.stringify(contacts))}, [contacts]);

  function onReadFromLocalStorage() {
    try {
      const unparsed = localStorage.getItem('phonebook');
      const parsed = JSON.parse(unparsed);
      if (parsed) return [...parsed];
    } catch (error) {
      console.log(error);
    }
  }

  const onSubmitForm = ({name, number}) => {
    const isExist = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isExist) {
      alert(`${name} is already in contacts.`);
      return;
    }
    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    setContacts(prev => [newContact, ...prev]);
  };

  const onDeleteContact = contactId => {
    setContacts(prev => prev.filter(contact => contact.id !== contactId));
  };

  const onChangeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getFilteredContacts = () => {
    const normFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normFilter)
    );
  };

    return (
      <div className={css.app}>
        <h1 className={css.head}>Phonebook</h1>
        <ContactForm onSubmitForm={onSubmitForm} />

        <h2 className={css.head}>Contacts</h2>
        <Filter filter={filter} onFilter={onChangeFilter} />
        <ContactList
          contacts={getFilteredContacts()}
          onDeleteContact={onDeleteContact}
        />
      </div>
    );
}

export default App;


// contacts: [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ]