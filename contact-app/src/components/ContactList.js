import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";
import { useContactsCurd } from "./context/ContactsCurdContext";

function ContactList() {
  const { contacts, reteriveContacts, searchHandler, text, searchResult } =
    useContactsCurd();

  useEffect(() => {
    reteriveContacts();
  }, []);

  const renderContactList = (text.length < 1 ? contacts : searchResult).map(
    (contact) => {
      return <ContactCard key={contact.id} contact={contact} />;
    }
  );

  const onUserSearch = (e) => {
    searchHandler(e.target.value);
  };

  return (
    <div className="main">
      <h2>
        Contact List
        <Link to="/add">
          <button className="ui button blue right">Add Contact</button>
        </Link>
      </h2>
      <div className="ui search">
        <div className="ui icon input">
          <input
            type="text"
            placeholder="Search Contacts"
            className="prompt"
            value={text}
            onChange={(e) => onUserSearch(e)}
          />
          <i className="search icon"></i>
        </div>
      </div>
      <div className="ui celled list">
        {renderContactList.length > 0 ? (
          renderContactList
        ) : (
          <h4>"No Contacts available !!"</h4>
        )}
      </div>
    </div>
  );
}

export default ContactList;
