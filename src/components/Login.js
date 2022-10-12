import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

const Login = (props) => {

    const host = "http://127.0.0.1:8000"
    const [creds, setCreds] = useState({ email: "", password: "" })
    let history = useNavigate();


    useEffect(() => {
        if (localStorage.getItem('token')){
            history("/");
        }
        // eslint-disable-next-line
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: creds.email, password: creds.password })
        });
        const res = await response.json();
        console.log(res)

        if (res.success) {
            // redirect
            localStorage.setItem("token", res.auth_token);
            history("/");
            // props.showAlert("Logged in Successfully", 'success')
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
            <h2>Login</h2>
            <form>
                <div className="mb-3 my-4">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={creds.email} onChange={onChange} aria-describedby="emailHelp" autoComplete="on"/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={creds.password} onChange={onChange} name="password" autoComplete="on" />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default Login