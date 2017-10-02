import React, { Component } from 'react';
import ListContacts from './ListContacts';
import AddContact from './AddContact';
import { Route } from 'react-router-dom';
import * as ContactsAPI from './utils/ContactsAPI';

class App extends Component {
  state = {
    contacts: [],
  }

  componentDidMount() {
    ContactsAPI.getAll().then((contacts) => {
      this.setState({ contacts })
    })
  }

  deleteContact = (contact) => {
    this.setState((state) => ({
      contacts: state.contacts.filter((c) => c.id !== contact.id)
    }))
    ContactsAPI.remove(contact);
  }

  createContact = (contact) => {
    ContactsAPI.create(contact).then(contact => {
      this.setState(state => ({
        contacts: state.contacts.concat([contact])
      }))
    })
  }

  render() {
    return (
      <div>
        <Route exact path='/' render={() => (
          <ListContacts
            onContactDelete={this.deleteContact}
            contacts={this.state.contacts} />
        )} />
        <Route path='/create' render={({history}) => (
          <AddContact onCreateContact={(contact) => {
            this.createContact(contact)
            history.push("/")
          }}
          />
        )}
        />
      </div>
    );
  }
}

export default App;
