import React from 'react';

const EntryList = ({ entries, setEditingEntry, deleteEntry }) => {
  if (!Array.isArray(entries)) {
    console.error('Entries is not an array:', entries);
    return null;
  }

  return (
    <ul className="list-group todo-list">
      {entries.map(entry => (
        <li key={entry.id} className="list-group-item todo-item">
          <span>{entry.name}: {entry.description}</span>
          <div>
            <button onClick={() => setEditingEntry(entry)} className="btn btn-primary btn-sm">
              Bearbeiten
            </button>
            <button onClick={() => deleteEntry(entry.id)} className="btn btn-danger btn-sm ml-2">
              Löschen
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default EntryList;