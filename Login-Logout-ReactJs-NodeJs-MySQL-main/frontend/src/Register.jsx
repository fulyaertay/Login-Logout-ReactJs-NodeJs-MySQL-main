import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const Register = () => {
  const navigate = useNavigate();

  const [register, setRegister] = useState({


    password: "",
    username: ""
  });

  const [err, SetErr] = useState(null);

  const handleInputChange = (e) => {
    setRegister((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/register", register);
      navigate("/");
    } catch (error) {
      SetErr(error.response.data);
      console.log(error);
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register">
        <div className="filter-div"></div>
        <form className="register-form" onSubmit={handleSubmit}>
          <h1>Register</h1>
          <input
            type="text"
            name="username"
            id="username"
            className="username-input"
            placeholder="Username"
            onChange={handleInputChange}
            required
          />
     
          <input
            type="password"
            name="password"
            id="password"
            className="password-input"
            placeholder="Password"
            onChange={handleInputChange}
            required
          />
          <button type="submit" className="standart-btn">
            Register
          </button>
          <Link to={"/login"}>go to login page</Link>
          {err && <p className="error-message">{err}</p>}
        </form>
      </div>
    </div>
  );
};