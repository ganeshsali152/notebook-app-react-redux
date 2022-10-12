import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

const Signup = (props) => {

  const host = "http://127.0.0.1:8000"
  const [creds, setCreds] = useState({ email: "", password: "", cpassword: "" })
  let history = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      history("/");
    }
    // eslint-disable-next-line
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = creds;
    const response = await fetch(`${host}/user/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
      // body: JSON.stringify({email:creds.email,password:creds.password})
    });
    const res = await response.json();
    console.log(res)

    if (res.success) {
      // redirect
      localStorage.setItem("token", res.auth_token);
      history("/");
      // props.showAlert("Successfully Created Your Account", 'success')
    }
    else {
      // props.showAlert("Invalid Credentials", 'danger')
    }
  }


  const onChange = (e) => {
    setCreds({ ...creds, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <h2>SignUp</h2>
      <form>
        <div className="mb-3 my-4">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" autoComplete="on" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" onChange={onChange} autoComplete="on"/>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} autoComplete="on"/>
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  )
}

export default Signup