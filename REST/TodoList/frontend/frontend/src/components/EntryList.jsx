import React from 'react';

const EntryList = ({ entries, setEditingEntry, deleteEntry }) => {
  return (
    <ul className="list-group">
      {entries.map(entry => (
        <li key={entry.id} className="list-group-item d-flex justify-content-between align-items-center">
          <span>{entry.name}: {entry.description}</span>
          <div>
            <IconButton onClick={() => setEditingEntry(entry)} color="primary">
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => deleteEntry(entry.id)} color="secondary">
              <DeleteIcon />
            </IconButton>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default EntryList;