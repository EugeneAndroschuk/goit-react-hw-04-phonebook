import ContactListItem from 'components/ContactListItem/ContactListItem';
import PropTypes from 'prop-types';
import css from './ContactList.module.css';

const ContactList = (props) => {
    const { contacts, onDeleteContact } = props;
    return (
      <ul className={css['contact-list']}>
        {contacts.map(contact => (
          <li key={contact.id}>
            <ContactListItem
              contact={contact}
              onDeleteContact={onDeleteContact}
            />
          </li>
        ))}
      </ul>
    );
}

ContactList.propTypes = {
  onDeleteContact: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};

export default ContactList;