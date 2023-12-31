import React, { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";


 function Register() {

  const[values, setValues] = useState({
    email:'',
    password:''
  })

  const navigate = useNavigate()

  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/register', values)
    .then(res => {
      if(res.data.Status === "Success"){
        navigate('/',{state:{email:values.email}})
      }else {
        alert("email var")
      }
    })
    .catch(err => console.log(err));
    

  }

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded w-50">
        <h2>Sign-up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
        <label htmlFor="email"><strong>Email</strong></label>
        <input type="email" placeholder="Enter Email" name="email" autoComplete="off" onChange={e => setValues({...values, email: e.target.value})} className="form-control rounded-0"></input>
        </div>
        <div className="mb-3">
        <label htmlFor="password"><strong>Password</strong></label>
        <input type="password" placeholder="Enter Password" name="password" autoComplete="off" onChange={e=> setValues({...values,password:e.target.value})} className="form-control rounded-0"></input>
        </div>
        <button type="submit" className="btn btn-success w-100 rounded-0">Register</button>
        
      </form>
      </div>

    </div>
  );
}
export default Register;
