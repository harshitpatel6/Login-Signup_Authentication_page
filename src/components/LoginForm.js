import './login.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import background from '../assets/background.mp4';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  let data = [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8080/respo', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    console.log(data);
    setEmail('');
    setPassword('');

    if (data.length === 0) {
      alert("Invalid email and password...");
    } else {
      navigate('/HomePage'); // Redirect to the homepage
    }
  };

  return (
    <main>
      <div className='container'>
        <div className="login-form">
          <div className="login">
            <h1 style={{ color: '#fff',fontSize :'50px' }}>Login</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input className='inp' name='email' onChange={e => setEmail(e.target.value)} type="text" placeholder='Username' value={email} />
            </div>
            <div className="form-group">
              <input className='inp' name='password' onChange={e => setPassword(e.target.value)} type="password" placeholder='Password' value={password} />
            </div>

            <div className="mid">
              <div className='pr'>
                <p className='ext'> <input type="checkbox" /> Remember me </p>
              </div>
              <Link className="nav-link" to="/ForgotPassword"> <p className='ext'> Forgot Password </p></Link>
            </div>

            <div>
              {data.length === 0 ? (
                <button className="btn">Submit</button>
              ) : (
                <Link className="btn" to="/HomePage">Submit</Link>
              )}
            </div>
          </form>


          <div className='btt'>
            <p>Don't have an account?<Link className="nav-link" to="/SignupForm">Sign Up</Link></p>
          </div>
        </div>
      </div>
      <div className='back'>
        <video src={background} autoPlay loop muted />
      </div>
    </main>
  );
}
