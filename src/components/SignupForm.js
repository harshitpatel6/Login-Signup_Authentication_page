import React, { useState } from 'react';
import './signup.css';
import { Link } from 'react-router-dom';
import background from '../assets/background.mp4';

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [form, setForm] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
    rotp: '',
  });

  const [isValidfname, setIsValidfname] = useState(true);
  const [isValidlname, setIsValidlname] = useState(true);
  const [isValidemail, setIsValidemail] = useState(true);
  const otp = '';

  const [showOTP, setShowOTP] = useState(false);
  const [accountCreated, setAccountCreated] = useState(false);

  const validateName = (name) => {
    const pattern = /^[A-Za-z]+(?:\s+[A-Za-z]+)*$/;
    return pattern.test(name);
  };

  const validateEmail = (email) => {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(email);
  };

  const confirmOtp = () => {
    if (form.rotp === form.otp) {
      alert('Create Password');
      setAccountCreated(true);
    } else {
      alert('OTP is incorrect.');
    }
  };

  const handleSendOTP = async (e) => {

    e.preventDefault();
    const digits = '0123456789';
    let generatedOTP = '';
    for (let i = 0; i < 6; i++) {
      generatedOTP += digits[Math.floor(Math.random() * 10)];
    }

    if(form.fname != '' && form.lname != '' && form.email != ''){

      setForm((prevState) => ({
        ...prevState,
        rotp: generatedOTP,
      }));

      setShowOTP(true);

      try {
        const response = await fetch('http://localhost:8080/send-otp-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, otp: generatedOTP }),
        });

        const data = await response.json();
        console.log(data.message);
      } catch (error) {
        console.error('Error sending OTP email:', error);
      }
    }
    else{
      alert("Input the enter field..");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8080/demo', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log(data);
    setForm({
      fname: '',
      lname: '',
      email: '',
      password: '',
      rotp: '',
    });
    window.location.href = '/HomePage';
    alert("Account created successfully")
  };

  return (
    <>
      <div className="container">
        <div className="login-formm">
          <div className="login">
            <h1 style={{ color: '#fff' }}>Sign Up</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <input
              className="inp"
              type="text"
              name="fname"
              placeholder="First Name"
              value={form.fname}
              onChange={(e) =>{ const newName = e.target.value;  setForm({ ...form, fname: newName }); setIsValidfname(validateName(newName)); } } 
              required
            />
            {!isValidfname && <p className='alt'>Please enter a valid name.</p>}

            <input
              className="inp"
              type="text"
              name="lname"
              placeholder="Last Name"
              value={form.lname}
              onChange={(e) =>{ const newName = e.target.value;  setForm({ ...form, lname: newName }); setIsValidlname(validateName(newName)); } } 
              required
            />
            {!isValidlname && <p className='alt'>Please enter a valid name.</p>}

            <input
              className="inp"
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>{ const mail = e.target.value; setEmail(e.target.value);  setForm({ ...form, email: mail }); setIsValidemail(validateEmail(mail)); } } 
              required
            />
            {!isValidemail && <p className='alt'>Please enter a valid email.</p>}

            {showOTP ? (
              <div className="subbtn">
                {accountCreated ? (
                  <>
                    <input
                      className="inp"
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      required
                    />
                      <Link style={{border:'2px solid black'}} className="conf" to="/HomePage" onClick={handleSubmit}>Submit</Link>
                      
                  </>
                ) : (
                  <div className='outer'>
                    <div className="confirm">
                    <input
                      className="otp-input"
                      type="text"
                      name="otp"
                      style={{ color: 'black' }}
                      value={form.otp}
                      onChange={(e) => setForm({ ...form, otp: e.target.value })}
                      maxLength={6}
                      required
                    />
                    {form.rotp === otp ? (
                      <>
                        <button className='conf' onClick={confirmOtp}>CONFIRM</button>
                      </>
                    ) : (
                      <>
                        <button className='conf' onClick={()=> alert("OTP is Incorrect") }>CONFIRM</button>
                      </>
                    )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="otpbox">
                <div className="send" onClick={handleSendOTP}>
                  <button className='btnn' style={{ color: '#fff' }}>Send OTP</button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
      <div className="back">
        <video src={background} autoPlay loop muted />
      </div>
    </>
  );
}
