import { createContext, useContext, useState } from "react";
import api from "../../api/contacts";
import { v4 as uuid } from "uuid";

const ContactsCurdContext = createContext();

export function ContactsCurdContextProvider({ children }) {
  const [contacts, setContacts] = useState([]);
  const [text, setText] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  //ReteriveContacts
  const reteriveContacts = async () => {
    const response = await api.get("/contacts");
    if (response.data) setContacts(response.data);
  };

  //AddContacts
  const addContactHandler = async (contact) => {
    const request = {
      id: uuid(),
      ...contact,
    };

    const response = await api.post("/contacts", request);
    console.log(response);
    setContacts([...contacts, response.data]);
  };

  //UpdateContacts
  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const { id } = response.data;
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      })
    );
  };

  //DeleteContacts
  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  };

  //SearchContacts
  const searchHandler = (searchTerm) => {
    setText(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResult(newContactList);
    } else {
      setSearchResult(contacts);
    }
  };

  const value = {
    contacts,
    reteriveContacts,
    removeContactHandler,
    addContactHandler,
    updateContactHandler,
    searchHandler,
    text,
    searchResult,
  };

  return (
    <ContactsCurdContext.Provider value={value}>
      {children}
    </ContactsCurdContext.Provider>
  );
}

export function useContactsCurd() {
  return useContext(ContactsCurdContext);
}
