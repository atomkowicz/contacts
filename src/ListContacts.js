import React from 'react';

const ListContacts = (props) => {
    console.log(props.contacts);
    return (
        <ol className="contact-list">
            {props.contacts.map((contact) => (
                <li key={contact.id} className='contact-list-item'>
                    <div className='contact-avatar' style={{ backgroundImage: `url('${contact.avatarURL}')` }}></div>
                    <div className='contact-details'>
                        <p>{contact.name}</p>
                        <p>{contact.email}</p>
                    </div>
                    <button onClick={() => props.onContactDelete(contact)} className='contact-remove'>remove</button>
                </li>
            ))}
        </ol>
    );
}


export default ListContacts;