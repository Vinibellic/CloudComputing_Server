import React, { useState } from 'react';

const EditForm = ({ entry, updateEntry }) => {
  const [name, setName] = useState(entry.name);
  const [description, setDescription] = useState(entry.description);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateEntry(entry.id, { name, description });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Beschreibung"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">Eintrag bearbeiten</button>
    </form>
  );
};

export default EditForm;