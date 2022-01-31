import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import EditContact from "./EditContact";
import ContactDetails from "./ContactDetails";
import { ContactsCurdContextProvider } from "./context/ContactsCurdContext";

const App = () => {
  return (
    <div className="ui container">
      <Router>
        <Header />
        <ContactsCurdContextProvider>
          <Routes>
            <Route path="/" exact element={<ContactList />} />
            <Route path="/add" element={<AddContact />} />
            <Route path="/edit" element={<EditContact />} />
            <Route path="/contact/:id" element={<ContactDetails />} />
          </Routes>
        </ContactsCurdContextProvider>
      </Router>
    </div>
  );
};

export default App;
