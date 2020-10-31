import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function CreateExercise() {
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   setUsers(['test user', 'another user']);
  //   setUsername('test user');
  // }, [setUsers, setUsername]);

  useEffect(() => {
    axios.get('http://localhost:5000/users')
      .then(response => {
        if (response.data.length > 0) {
          setUsers(response.data.map(user => user.username));
          setUsername(response.data[0].username);
        }
      })
  })

  const onSubmit = (e) => {
    e.preventDefault();

    const exercise = {
      username,
      description,
      duration,
      date,
    };

    axios.post("http://localhost:5000/exercises/add", exercise)
      .then(res => console.log(res))
      .catch(console.log);

    window.location = '/';
  };

  return (
    <div>
      <h3>Create new Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username: </label>
          <select
            name="username"
            id="username"
            required
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          >
            {users.map((user, idx) => {
              return (
                <option key={idx} value={user}>
                  {user}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description: </label>
          <input
            type="text"
            name="description"
            id="description"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="duration">Duration (in minutes): </label>
          <input
            type="number"
            name="duration"
            id="duration"
            min="1"
            className="form-control"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date: </label>
          <div>
            <DatePicker selected={date} onChange={setDate} />
          </div>
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create Exercise Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
export default CreateExercise;
