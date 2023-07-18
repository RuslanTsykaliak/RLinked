import React, { useState } from 'react'
import { LoginAPI, GoogleSignInAPI } from '../api/AuthAPI';
import RLinkedLogo from '../assets/RLinkedLogo.jpg';
import GoogleButton from 'react-google-button';
import { navigate } from '../helpers/useNavigate';
import '../Sass/LoginComponent.scss';
import { toast } from 'react-toastify';

export default function LoginComponent() {
    const [credentails, setCredentials] = useState({});
    const login = async () => {
        try {
        let res = await LoginAPI(credentails.email, credentails.password);
        // console.log(res?.user);
        toast.success('Signed In to RLinked!');
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
                placeholder='Enter your Email'
                />
                <input
                onChange={(event) =>
                setCredentials({ ...credentails, password: event.target.value})
                }
                type='password'
                className='common-input'
                placeholder='Enter your Password'
                />
            </div>
            <button onClick={login} className="login-btn">
            Sign in
        </button>
        </div>
        <hr className="hr-text" data-content="or" />
      <div className="google-btn-container">
      <GoogleButton className='google-btn' onClick={GoogleSignIn}
    //   {() => { console.log('Google button clicked') }} 
      />
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



        // <hr className="hr-text" data-content="or" />
        // <div className="google-btn-container">
        //   <p className="go-to-signup">
        //     New to LinkedIn?{" "}
        //     <span className="join-now" onClick={() => navigate("/register")}>
        //       Join now
        //     </span>
        //   </p>
        // </div>


//     const login = () => {
//         let res = LoginAPI();
//         console.log(res);
//     };
//   return (
//     <div>
//       <h1>LoginComponent</h1>
//       <input className='common-input' placeholder='Enter your Email'/>
//       <button onClick={login} className='login-btn'>Log in to RLinked</button>
//     </div>
