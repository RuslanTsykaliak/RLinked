import React, { useState } from 'react'
import { LoginAPI, GoogleSignInAPI } from '../api/AuthAPI';
import RLinkedLogo from '../assets/RLinkedLogo.jpg';
import GoogleButton from 'react-google-button';
import { useNavigate } from "react-router-dom";
import '../Sass/LoginComponent.scss';
import { toast } from 'react-toastify';

export default function LoginComponent() {
    let navigate = useNavigate();
    const [credentails, setCredentials] = useState({});
    const login = async () => {
        try {
        let res = await LoginAPI(credentails.email, credentails.password);
        // console.log(res?.user);
        toast.success('Signed In to RLinked!');
        localStorage.setItem("userEmail", res.user.email);
        navigate("/home");
      } catch(err) {
        console.log(err);
        toast.error('Please Check your Credetials!');
      }
    };

    const GoogleSignIn = () => {
        let response = GoogleSignInAPI();
        console.log(response);
    }
    return (
        <div className="login-wrapper">
            <img src={RLinkedLogo} className='rlinkedLogo' />

            <div className="login-wrapper-inner">
            <h1 className='heading'>Sign in</h1>
            <p className="sub-heading">Be free in professional world</p>
            
            <div className="auth-inputs">
                <input
                onChange={(event) =>
                setCredentials({ ...credentails, email: event.target.value})
                }
                type='email'
                className='common-input'
                placeholder='Email or Phone'
                />
                <input
                onChange={(event) =>
                setCredentials({ ...credentails, password: event.target.value})
                }
                type='password'
                className='common-input'
                placeholder='Password'
                />
            </div>
            <button onClick={login} className="login-btn">
            Sign in
        </button>
        </div>
        <hr className="hr-text" data-content="or" />
      <div className="google-btn-container">
      <GoogleButton className='google-btn' onClick={GoogleSignIn} />
        <p className="go-to-signup">
          New to  RLinked?{" "}
          <span className="join-now" onClick={() => navigate("/register")}>
            Join now
          </span>
        </p>
      </div>
    </div>
  );
}
