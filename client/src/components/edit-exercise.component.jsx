import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function EditExercise(props) {
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/exercises'+ props.match.params.id)
      .then(({data: {username, description, duration, date}}) => {
        setUsername(username);
        setDescription(description);
        setDuration(duration);
        setDate(new Date(date));
      }).catch(console.log);

    axios.get('http://localhost:5000/users')
      .then(response => {
        if (response.data.length > 0) {
          setUsers(response.data.map(user => user.username));
        }
      });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const exercise = {
      username,
      description,
      duration,
      date,
    };

    axios.post("http://localhost:5000/exercises/update"+props.match.params.id, exercise)
      .then(res => console.log(res))
      .catch(console.log);

    window.location = '/';
  };

  return (
    <div>
      <h3>Edit Exercise Log</h3>
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
            value="Edit Exercise Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
export default CreateExercise;
