import React, { useEffect, useState } from 'react';
import './signup.css';
import background from '../assets/background.mp4';


export default function SignupForm() {

  const [form , setForm] = useState({});
  const [otpForm , showForm] = useState(true);


  const handleForm =(e)=> {
    setForm({
      ...form,
      [e.target.name] : e.target.value
    }) 
  } 
  
  const handleSubmit = async (e)=> {
    e.preventDefault();
    const response = await fetch('http://localhost:8080/demo',{
      method : 'POST',
      body : JSON.stringify(form),
      headers : {
        'Content-Type':'application/json'
      }
    })
    const data = await response.json(); 
    console.log(data);
    setForm({
      fname : '',
      lname : '',
      email : '',
      password : ''
    });
  }


  return (
    <>
      <div className='containe'>
        <div className="login-form">
          <div className="login">
            <h1 style={{color:'#fff'}}>Sign Up</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <input className='inp' type="text" name='fname' placeholder='First Name' onChange={handleForm} value={form.fname} required/>
            <input className='inp' type="text" name='lname' placeholder='Last Name' onChange={handleForm} value={form.lname} required/>
            <input className='inp' type="email" name='email' placeholder='Email' onChange={handleForm} value={form.email} required/>
            {
              otpForm ?
              <div className='otp'>
                <div className="otpbox">
                  <input className="otp-input" type="otp" maxLength={6} />
                </div>
                <div className="subbtn">
                  <button className='send'>Send OTP</button>
                </div>
              </div>
              :
              <div>
                <input className='inp' type="password" name='password' placeholder='password' onChange={handleForm} value={form.password} required/>
                <input type='submit' className='btn' placeholder='Submit'/>
              </div>  
            }
          </form>
        </div>
      </div>
      <div className='back'>
          <video src={background} autoPlay loop muted/>
      </div>
    </>
  )
}
 