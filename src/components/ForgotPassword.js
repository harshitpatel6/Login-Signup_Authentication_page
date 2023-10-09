import './ForgotPassword.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import background from '../assets/background.mp4';

export default function LoginForm() {
  const [otpForm , showForm] = useState(true);
  const[test,setTest] = useState(true);
  const[usrotp , setUsrotp] = useState('');
  const [email, setEmail] = useState('');
  const [paswd, setPswd] = useState('');
  const [paswd1, setPswd1] = useState('');
  const[otp , setOtp] = useState('');
  const navigate = useNavigate();

  const handleSendOTP = async (e) => {
    e.preventDefault();

    const digits = '0123456789';
    let generatedOTP = '';
    for (let i = 0; i < 6; i++) {
      generatedOTP += digits[Math.floor(Math.random() * 10)];
    }

    showForm(false);

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
      setOtp(data.otp);
    } catch (error) {
      console.error('Error sending OTP email:', error);
    }
  }

  const checkOtp =(e)=>{
    e.preventDefault();
    if(usrotp == otp){
      alert("Create Password...");
      setTest(false); 
    }
    else{
      alert("OTP is not correct...")
    }
  }

  const checkPswd =(e)=>{
    e.preventDefault();
    if(paswd == paswd1){
      alert("Password created succefully...");
      navigate('/LoginForm');
    }
    else{
      alert("Both the passwords are not matched..")
    }
  }

  return (
    <main>
      <div className='con'>
        <div className="login-for">
          <form >

          {
            otpForm ?
            
            <div className="email">

            <div className="login">
              <h1 style={{ color: '#fff' }}>Forgot Password</h1>
            </div>
              
              <p style={{marginTop : '-15px'}}>Enter Your Email address</p>
              
              <input className='inpu' onChange={(e)=>{setEmail(e.target.value)}} style={{marginTop : '7px'}} name='password' type="email" placeholder='Enter Email Here ... ' />

              <div className="subit">
                <button className="btnn" onClick={handleSendOTP} style={{marginTop : '10px'}}>Send Email</button>
              </div>

            </div>

            :
            <div className="outb">
              { test ?
                <div className="otp">
                  <h1 style={{color:'#fff' , marginTop : '-15px',}}>Enter OTP Code</h1>
                  
                  <div className="otp-input-container">
                    <input className="otp-input" onChange={(e)=>{setUsrotp(e.target.value)}}  type="otp" maxLength={6} />
                  </div>
                  <div className="otp-suit">
                    <button className="btnnn" onClick={checkOtp}>Send OTP</button>
                  </div>

                </div>
                :
                <div className="createpaswd">
                  <div className='heading'>
                    <h1 style={{color:'#fff', marginTop:'-70px' }}>Create Password</h1>
                  </div>

                  <div className='middle'>
                    <h1 style={{color:'#fff',fontSize:'25px', marginLeft:'-130px' , marginBottom : '-13px' }}>Enter Password</h1>
                    <input className="inpu" onChange={(e)=>{setPswd(e.target.value)}} placeholder='Enter Password' type="password" minLength={6} />

                    <h1 style={{color:'#fff',fontSize:'25px', marginLeft:'-100px' , marginBottom : '-13px' }}>Re-Enter Password</h1>
                    <input className="inpu" onChange={(e)=>{setPswd1(e.target.value)}} placeholder='Re-Enter Password' type="password" minLength={6} />
                  </div>

                  <div className="sbt" style={{marginTop : '25px'}}>
                  <button className='btnnn' onClick={checkPswd}>Submit</button>
                  </div>
                  
                </div>
              }
            </div>
          }
          </form>

        </div>
      </div>
      <div className='back'>
        <video src={background} autoPlay loop muted />
      </div>
    </main>
  );
}
