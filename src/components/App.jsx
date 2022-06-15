import { useState } from 'react';
import { nanoid } from 'nanoid';

// Components
import ContactForm from './Contact/ContactForm';
import ContactList from './Contact/ContactList';
import Filter from './Contact/ContactFilter';
import s from './Contact/Contact.module.css';

// Hooks
import useLocalStorage from 'hooks/useLocalStorage';

const App = () => {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const addContact = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    const alreadyInContacts = contacts.find(contact => contact.name === name);
    if (alreadyInContacts) {
      return alert(`${contact.name} is already in contacts`);
    } else setContacts(contacts => [contact, ...contacts]);
  };

  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const getFilteredContacts = () => {
    const normalizedFiltered = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFiltered)
    );
  };

  const deleteContact = contactId => {
    setContacts(contacts =>
      contacts.filter(contact => contact.id !== contactId)
    );
  };

  const filteredContacts = getFilteredContacts();

  return (
    <div className={s.phoneboook}>
      <h1 className={s.phonebookTitle}>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2 className={s.contactsTitle}>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={deleteContact}
      />
    </div>
  );
};

export default App;
