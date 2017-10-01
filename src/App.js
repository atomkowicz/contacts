import React, { Component } from 'react';
import ListContacts from './ListContacts';
import AddContact from './AddContact';
import * as ContactsAPI from './utils/ContactsAPI';

class App extends Component {
  state = {
    contacts: [],
    screen: 'list'
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

  render() {
    return (
      <div>
        {this.state.screen === 'list' &&
          <ListContacts
            onContactDelete={this.deleteContact}
            onNavigate={() => this.setState({ screen: 'create' })}
            contacts={this.state.contacts} />}
        {this.state.screen === 'create' &&
          <AddContact />}
      </div>
    );
  }
}

export default App;
