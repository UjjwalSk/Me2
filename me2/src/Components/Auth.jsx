import React, { useState, useRef, useContext } from "react";
import "./Auth.css";
import AuthContext from "../context/AuthContext";
import axios from "../Api";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Auth = () => {
    const [flag, setFlag] = useState(true);
    const ctx = useContext(AuthContext);
    const navigate = useNavigate();
    const nameRef = useRef(null);
    const usernameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    console.log(ctx)
    const submit = async (e) => {
        e.preventDefault();
        let data = {};
        if (flag) {
            data.name = nameRef.current.value;
            data.email = emailRef.current.value;
        }
        data.username = usernameRef.current.value;
        data.password = passwordRef.current.value;
        await axios.post(`/auth/${flag}`, data, { withCredentials: true }).then(() => {
            // getLoggedIn();
        })
    };

    return (
        <div className="auth-container App">
            <div className="left-pane" onClick={() => navigate("/new")} >
                <h1 className="auth-title">
                    <img src="/logo.svg" alt="logo" />
                    Welcome To Me2
                </h1>
            </div>
            <div className="right-pane">
                <div className="auth-form">
                    {/* <h1>{role ? "Admin Login" : flag ? "Create your account" : "Sign in"}</h1> */}
                    <form onSubmit={submit}>
                        {/* {console.log(role)} */}
                        {(flag) ? (
                            <>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Full Name"
                                    required
                                    ref={nameRef}
                                />
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Email Address"
                                    required
                                    ref={emailRef}
                                />
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    placeholder="Username"
                                    required
                                    ref={usernameRef}
                                />
                            </>
                        ) : (
                            <input
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Username"
                                required
                                ref={usernameRef}
                            />
                        )}
                        <div className="password-input">
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"
                                required
                                ref={passwordRef}
                            />
                        </div>
                        <button type="submit" className="submit-button">
                            {flag ? "Create Account" : "Sign In"}
                        </button>
                        {<p onClick={() => setFlag(!flag)} variant="body2" className="toggler">
                            {flag ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                        </p>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Auth;
