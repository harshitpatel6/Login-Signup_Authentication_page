import React from 'react';
import './Style.css';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function HomePage() {
    return (
        <div>
            <div className="banner">
                <div className="navbar">
                    <div className="signup">
                        <Link to={'/LoginForm'}>Login/SignUp</Link>
                    </div>
                    <img src={logo} alt="Logo"/>
                        <ul>
                            <li><a href="#"><strong>Home</strong></a></li>
                            <li><a href="#"><strong>About us </strong></a></li>
                            <li><a href="#"><strong>Services</strong></a></li>
                            <li><a href="#"><strong>Contact us</strong></a></li>
                        </ul>
                </div>
                <div className="intro">
                    <h1>Welcome TO Attack Box</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea ipsa omnis quas cum! A provident <br/>
                        ratione sequi, recusandae quis hic, nobis quas, dignissimos tempora at nesciunt excepturi quae</p>
                </div>
            </div>
        </div>
    )
}
