import "./styles.css";
import React, { useState } from "react";

const AddressBook = () => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterMobile, setFilterMobile] = useState("");

  const addContact = () => {
    if (!name || !mobile) {
      alert("Please enter a valid Name and Mobile Number");
      return;
    }

    if (contacts.find((contact) => contacts.mobile === mobile)) {
      alert("Mobile Number already exists.");
      return;
    }

    setContacts([...contacts, { name, mobile }]);
    setName("");
    setMobile("");
  };

  const filterContacts = () => {
    let filteredContacts = contacts;
    if (filterName) {
      filteredContacts = filteredContacts.filter((contact) =>
        contact.name.toLowerCase().includes(filterName.toLowerCase())
      );
    }
    if (filterMobile) {
      filteredContacts = filteredContacts.filter((contact) =>
        contact.mobile.includes(filterMobile)
      );
    }

    return filteredContacts.sort((a, b) => a.name.localeCompare(b.name));
  };

  const editContact = (index, newName, newMobile) => {
    if (
      contacts.find(
        (contact) => contact.mobile === newMobile && contact !== contacts[index]
      )
    ) {
      alert("Mobile number already exists");
      return;
    }

    const updatedContacts = [...contacts];
    updatedContacts[index].name = newName;
    updatedContacts[index].mobile = newMobile;

    setContacts(updatedContacts);
  };

  const deleteContact = (index) => {
    setContacts([...contacts.slice(0, index), ...contacts.slice(index + 1)]);
  };

  return (
    <div className="App">
      <h1>Address Book Manager</h1>
      <div className="inputField">
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Mobile Number:
          <input
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </label>

        <button onClick={addContact}>Add Contact</button>
      </div>

      <div className="inputField">
        <label>
          Filter by Name:
          <input
            type="text"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
          />
        </label>

        <label>
          Filter by Mobile Number:
          <input
            type="text"
            value={filterMobile}
            onChange={(e) => setFilterMobile(e.target.value)}
          />
        </label>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Mobile Number</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {filterContacts().map((contact, index) => (
            <tr key={index}>
              <td>{contact.name}</td>
              <td>{contact.mobile}</td>
              <td>
                <button
                  onClick={() =>
                    editContact(
                      index,
                      prompt("Enter new name", contact.name),
                      prompt("Enter new mobile number", contact.mobileNumber)
                    )
                  }
                >
                  Edit
                </button>
              </td>
              <td>
                <button onClick={() => deleteContact(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddressBook;
