import { useContext, useState } from 'react';
import './login.css';
import { AuthContext } from '../../contex/authContex';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [credential, setCredential] = useState({
    username: '',
    password: ''
  });
  const navigate = useNavigate();
  const { loading, error, dispatch } = useContext(AuthContext);

  const handleChange = (e) => {
    setCredential((prev) => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: 'loginstart' });
    try {
      const user = await axios.post("http://localhost:8000/api/auth/login", credential);
      dispatch({ type: "loginsuccess", payload: user.data.details });
      navigate("/");
    } catch (err) {
      if (err.response.status === 500) {
        const errorMessage = err.response.data; // Assuming the server sends an error message in the response JSON
        dispatch({ type: "loginfailed", payload: errorMessage });
      } else {
        dispatch({ type: "loginfailed", payload: err.response.data });
      }
    }
  };

  return (
    <div className="login">
      <form className="loginForm" onSubmit={handleClick}>
        <div className="lContainer">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            placeholder="Enter your username"
            id="username"
            value={credential.username}
            onChange={handleChange}
            className="lInput"
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            placeholder="Enter your password"
            id="password"
            value={credential.password}
            onChange={handleChange}
            className="lInput"
          />
          <button type="submit" className="lButton">
            Login
          </button>
          {error && <span>{error.message}</span>}
        </div>
      </form>
    </div>
  );
};
