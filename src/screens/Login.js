import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const[credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  let navigate = useNavigate();

const onChange = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://foodzy-backend-1.onrender.com/api/loginuser", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: credentials.email,
            password: credentials.password
        })
    })
    const json = await response.json();
    console.log(json);

    if(!json.success) {
        alert("Invalid Credentials")
    }
    else{
      localStorage.setItem('userEmail', credentials.email);
      localStorage.setItem('authToken', json.authToken);
      console.log(localStorage.getItem('authToken'));
      navigate('/');
    }
};

  return (
    <>
    <div className="container">
    <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
            <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1"/>
        </div>
        <button type="submit" className="m-3 btn btn-info">Login</button>
        <Link to = '/createuser' className = 'm-3 btn btn-danger'>Sign Up</Link>
        </form>
    </div>
    </>
  )
}

export default Login
