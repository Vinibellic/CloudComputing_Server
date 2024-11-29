import React from 'react';

const EntryList = ({ entries, setEditingEntry, deleteEntry }) => {
  return (
    <ul>
      {entries.map(entry => (
        <li key={entry.id}>
          <span>{entry.name}: {entry.description}</span>
          <button onClick={() => setEditingEntry(entry)}>Edit</button>
          <button onClick={() => deleteEntry(entry.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default EntryList;