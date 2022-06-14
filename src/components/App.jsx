import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './Contact/ContactForm';
import ContactList from './Contact/ContactList';
import Filter from './Contact/ContactFilter';
import s from './Contact/Contact.module.css';
class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(_, prevState) {
    const { contacts } = this.state;
    if (contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  addContact = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    const { contacts } = this.state;

    const alreadyInContact = contacts.find(contact => contact.name === name);
    if (alreadyInContact) {
      return alert(`${contact.name} is already in contact`);
    } else
      this.setState(({ contacts }) => ({
        contacts: [contact, ...contacts],
      }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFiltered = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFiltered)
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.getFilteredContacts();

    return (
      <div className={s.phoneboook}>
        <h1 className={s.phonebookTitle}>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <h2 className={s.contactsTitle}>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
export default App;
