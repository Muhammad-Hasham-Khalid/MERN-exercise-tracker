import React, { useState } from 'react';
import axios from 'axios';

const CreateUser = () => {
  const [username, setUsername] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/users/add', { username })
      .then((res) => console.log(res.data))
      .catch(console.log);
    setUsername('');
  };

  return (
    <div>
      <h3>Create New User</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            name="username"
            id="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create User"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
