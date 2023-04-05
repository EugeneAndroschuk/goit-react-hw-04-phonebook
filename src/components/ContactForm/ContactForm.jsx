import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';

const ContactForm = (props) => {
  const[name, setName] = useState('');
  const[number, setNumber] = useState('');

  const handleSubmitForm = e => {
    e.preventDefault();
    props.onSubmitForm({name, number});
    setName('');
    setNumber('');
  };

  const handleInputChange = e => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'name': setName(value);
        break;
      case 'number': setNumber(value);
        break;
      default: break;
    }
  };

    return (
      <form className={css.form} onSubmit={handleSubmitForm}>
        <label htmlFor="text">Name</label>
        <input
          className={css.input}
          type="text"
          name="name"
          value={name}
          id="text"
          onChange={handleInputChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />

        <label htmlFor="tel">Number</label>
        <input
          className={css.input}
          type="tel"
          name="number"
          value={number}
          id="tel"
          onChange={handleInputChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />

        <button className={css.submitBtn} type="submit">
          Add contact
        </button>
      </form>
    );
}

ContactForm.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
};

export default ContactForm;
