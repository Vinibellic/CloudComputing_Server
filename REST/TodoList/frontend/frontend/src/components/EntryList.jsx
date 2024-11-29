import React from 'react';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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