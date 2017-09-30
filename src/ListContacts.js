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

    resetQuery = () => {
        this.setState({
            query: ''
        })
    }

    render() {

        let showingContacts;

        const { onContactDelete, contacts } = this.props;
        const { query } = this.state;

        if (query) {
            const match = new RegExp(escapeRegExp(query), "i");
            showingContacts = contacts.filter((contact) => match.test(contact.name));
        } else {
            showingContacts = contacts;
        }

        showingContacts.sort(sortBy("name"));

        return (
            <div className="list-contacts">
                <div className="list-contacts-top">
                    <input className="search-contacts"
                        type="text"
                        placeholder="Search contacts"
                        value={query}
                        onChange={(event) => this.updateQuery(event.target.value)} />
                </div>

                {showingContacts.length !== contacts.length &&
                    (<div className="showing-contacts">
                        <span>Now showing {showingContacts.length} of {contacts.length} total</span>
                        <button onClick={this.resetQuery}>Reset all</button>
                    </div>
                    )}

                <ol className="contact-list">
                    {showingContacts.map((contact) => (
                        <li key={contact.id} className='contact-list-item'>
                            <div className='contact-avatar' style={{ backgroundImage: `url('${contact.avatarURL}')` }}></div>
                            <div className='contact-details'>
                                <p>{contact.name}</p>
                                <p>{contact.email}</p>
                            </div>
                            <button onClick={() => onContactDelete(contact)} className='contact-remove'>remove</button>
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