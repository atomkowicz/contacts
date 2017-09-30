import React from 'react';
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class ListContacts extends React.Component {

    static propTypes = {
        contact: PropTypes.array.isRequired,
        onContactDelete: PropTypes.func.isRequired
    }

    state = {
        query: ''
    }

    updateQuery = (query) => {
        this.setState({
            query: query.trim()
        });
    }

    render() {

        let showingContacts;

        if (this.state.query) {
            const match = new RegExp(escapeRegExp(this.state.query), "i");
            showingContacts = this.props.contacts.filter((contact) => match.test(contact.name));
        } else {
            showingContacts = this.props.contacts;
        }

        return (
            <div className="list-contacts">
                <div className="list-contacts-top">
                    <input className="search-contacts"
                        type="text"
                        placeholder="Search contacts"
                        value={this.state.query}
                        onChange={(event) => this.updateQuery(event.target.value)} />
                </div>
                <ol className="contact-list">
                    {showingContacts.map((contact) => (
                        <li key={contact.id} className='contact-list-item'>
                            <div className='contact-avatar' style={{ backgroundImage: `url('${contact.avatarURL}')` }}></div>
                            <div className='contact-details'>
                                <p>{contact.name}</p>
                                <p>{contact.email}</p>
                            </div>
                            <button onClick={() => this.props.onContactDelete(contact)} className='contact-remove'>remove</button>
                        </li>
                    ))}
                </ol>
            </div>
        );
    }

}

// const ListContacts = (props) => {
//     console.log(props.contacts);
//     return (
//         <ol className="contact-list">
//             {props.contacts.map((contact) => (
//                 <li key={contact.id} className='contact-list-item'>
//                     <div className='contact-avatar' style={{ backgroundImage: `url('${contact.avatarURL}')` }}></div>
//                     <div className='contact-details'>
//                         <p>{contact.name}</p>
//                         <p>{contact.email}</p>
//                     </div>
//                     <button onClick={() => props.onContactDelete(contact)} className='contact-remove'>remove</button>
//                 </li>
//             ))}
//         </ol>
//     );
// }
// ListContacts.PropTypes = {
//     contact: PropTypes.array.isRequired,
//     onContactDelete: PropTypes.func.isRequired
// }

export default ListContacts;