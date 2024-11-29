import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EntryForm from './components/EntryForm.jsx';
import EntryList from './components/EntryList.jsx';
import EditForm from './components/EditForm.jsx';

const App = () => {
  const [entries, setEntries] = useState([]);
  const [editingEntry, setEditingEntry] = useState(null);

  useEffect(() => {
    axios.get('/api/data')
      .then(response => setEntries(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const addEntry = (entry) => {
    axios.post('/api/data', entry)
      .then(response => setEntries([...entries, response.data]))
      .catch(error => console.error('Error adding entry:', error));
  };

  const updateEntry = (id, updatedEntry) => {
    axios.put(`/api/data/${id}`, updatedEntry)
      .then(response => {
        setEntries(entries.map(entry => (entry.id === id ? response.data : entry)));
        setEditingEntry(null);
      })
      .catch(error => console.error('Error updating entry:', error));
  };

  const deleteEntry = (id) => {
    axios.delete(`/api/data/${id}`)
      .then(() => setEntries(entries.filter(entry => entry.id !== id)))
      .catch(error => console.error('Error deleting entry:', error));
  };

  return (
    <div>
      <h1>Todo List</h1>
      {editingEntry ? (
        <EditForm entry={editingEntry} updateEntry={updateEntry} />
      ) : (
        <EntryForm addEntry={addEntry} />
      )}
      <EntryList entries={entries} setEditingEntry={setEditingEntry} deleteEntry={deleteEntry} />
    </div>
  );
};

export default App;