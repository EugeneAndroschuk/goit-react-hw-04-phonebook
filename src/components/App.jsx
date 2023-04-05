import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import css from './App.module.css';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    try {
      const unparsed = localStorage.getItem('phonebook');
      const parsed = JSON.parse(unparsed);
      if (parsed) this.setState({ contacts: parsed });
    } catch (error) {
      console.log(error)
    }
  }

  componentDidUpdate(prevState) {
    if(prevState.contacts !== this.state.contacts) localStorage.setItem('phonebook', JSON.stringify(this.state.contacts));
  }

  onSubmitForm = stateForm => {
    const isExist = this.state.contacts.some(
      contact => contact.name.toLowerCase() === stateForm.name.toLowerCase()
    );

    if (isExist) {
      alert(`${stateForm.name} is already in contacts.`);
      return;
    }
    const newContact = {
      id: nanoid(),
      name: stateForm.name,
      number: stateForm.number,
    };

    this.setState(prevState => ({
      contacts: [newContact, ...prevState.contacts],
    }));
  };

  onDeleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  onChangeFilter = e => {
    this.setState({
      filter: e.currentTarget.value,
    });
  };

  getFilteredContacts = () => {
    const normFilter = this.state.filter.toLowerCase();
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normFilter)
    );
  };

  render() {
    return (
      <div className={css.app}>
        <h1 className={css.head}>Phonebook</h1>
        <ContactForm onSubmitForm={this.onSubmitForm} />

        <h2 className={css.head}>Contacts</h2>
        <Filter filter={this.state.filter} onFilter={this.onChangeFilter} />
        <ContactList
          contacts={this.getFilteredContacts()}
          onDeleteContact={this.onDeleteContact}
        />
      </div>
    );
  }
}

export default App;


// contacts: [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ]