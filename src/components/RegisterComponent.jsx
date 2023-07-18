import React, { useState } from 'react';
import { RegisterAPI } from '../api/AuthAPI';
// import { postUserData } from "../api/FirestoreAPI";
import RLinkedLogo from '../assets/RLinkedLogo.jpg';
import { useNavigate } from "react-router-dom";
// import { getUniqueID } from "../helpers/getUniqueId";
import { navigate } from '../helpers/useNavigate';

import '../Sass/LoginComponent.scss';
import { toast } from 'react-toastify';

export default function RegisterComponent() {
    let navigate = useNavigate();
    const [credentails, setCredentials] = useState({});
    const register = async () => {
        try {
            let res = await RegisterAPI(credentails.email, credentails.password);
            toast.success("Account Created!"); 
            postUserData({
                userID: getUniqueID(),
                name: credentails.name,
                email: credentails.email,
                imageLink:
                "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
            });
            navigate("/home");
            localStorage.setItem("userEmail", res.user.email);
            } catch(err) {
                console.log(err);
                toast.error("Cannot Create your Account");
            }
        };

    return (
        <div className="login-wrapper">
            <img src={RLinkedLogo} className='rlinkedLogo' />

            <div className="login-wrapper-inner">
            <h1 className='heading'>Sign in</h1>
            <p className="sub-heading">Be free in professional world</p>
            
            <div className="auth-inputs">
                <input
                onChange={(event) =>
                setCredentials({ ...credentails, name: event.target.value})
                }
                type='text'
                className='common-input'
                placeholder='Your Name'
                />
                <input
                onChange={(event) =>
                    setCredentials({ ...credentails, email: event.target.value })
                }
                type="email"
                className="common-input"
                placeholder="Email or phone number"
                />
                <input
                onChange={(event) =>
                setCredentials({ ...credentails, password: event.target.value})
                }
                type='password'
                className='common-input'
                placeholder='Password (6 or more characters)'
                />
            </div>
            <button onClick={register} className="login-btn">
            Agree & Join
        </button>
        </div>
      <hr class="hr-text" data-content="or" />
      <div className="google-btn-container">
        <p className="go-to-signup">
          Already on RLinked?{" "}
          <span className="join-now" onClick={() => navigate("/")}>
            Sign in
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
