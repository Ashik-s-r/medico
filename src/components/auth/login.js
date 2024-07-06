import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../store/authSlice";
import Navbar from "../navebar";
import { useNavigate } from "react-router-dom";
import '../login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function attemptLogin() {
        axios.post('https://medicalstore.mashupstack.com/api/login', {
            email: email,
            password: password
        })
        .then(response => {
            setErrorMessage('');
            const user = {
                email: email,
                token: response.data.token
            };
            dispatch(setUser(user));
            navigate("/List");
        })
        .catch(error => {
            if (error.response.data.errors) {
                setErrorMessage(Object.values(error.response.data.errors).join(' '));
            } else if (error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('Failed to login user. Please contact admin');
            }
        });
    }

    return (
        <div>
            <Navbar />
            <div className="containerrr">
                <div className="formContainer">
                    <form>
                        <h3>Login</h3>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email address"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <button
                                type="button"
                                className="btn btn-primary btn-block"
                                onClick={attemptLogin}
                            >
                                Login
                            </button>
                        </div>
                    </form>
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                </div>
            </div>
        </div>
    );
}

export default Login;
