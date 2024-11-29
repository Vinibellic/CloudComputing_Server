import React, { useState } from 'react';

const EditForm = ({ entry, updateEntry }) => {
  const [name, setName] = useState(entry.name);
  const [description, setDescription] = useState(entry.description);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateEntry(entry.id, { name, description });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Update Entry</button>
    </form>
  );
};

export default EditForm;