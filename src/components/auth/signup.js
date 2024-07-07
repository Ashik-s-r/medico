import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../navebar";
import "../siginup.css"; // Import external CSS file

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConf, setPasswordConf] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    function registerUser() {
        const user = {
            name: name,
            email: email,
            password: password,
            password_confirmation: passwordConf
        };

        axios.post('https://medicalstore.mashupstack.com/api/register', user)
            .then(response => {
                setErrorMessage('');
                navigate('login');
            })
            .catch(error => {
                if (error.response.data.errors) {
                    setErrorMessage(Object.values(error.response.data.errors).join(' '));
                } else {
                    setErrorMessage('Failed to connect to API');
                }
            });
    }

    return (
        <div>
            <Navbar />
            <div className="containerr">
                <div className="formContainer">
                    
                    <form>
                        <h3>Signup</h3>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Full Name"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </div>
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
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Confirm Password"
                                value={passwordConf}
                                onChange={(event) => setPasswordConf(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <button
                                type="button"
                                className="btn btn-primary btn-block"
                                onClick={registerUser}
                            >
                                Sign Up
                            </button>
                        </div>
                        <p>
                            Already have an account? <Link to="/login">Login here</Link>
                        </p>
                    </form>
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                </div>
            </div>
        </div>
    );
}

export default Signup;
