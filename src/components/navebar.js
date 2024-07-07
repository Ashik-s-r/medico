import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from './store/authSlice';

function Navbar() {
    const user = useSelector((store) => store.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutUser = () => {
        if (user) {
            axios.post(
                'https://medicalstore.mashupstack.com/api/logout',
                {},
                {
                    headers: { Authorization: `Bearer ${user.token}` },
                }
            )
                .then(() => {
                    dispatch(removeUser());
                    navigate('/login');
                })
                .catch((error) => {
                    console.error('Logout error:', error);
                });
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <NavLink exact to="/" className="navbar-brand">
                    My Medicine
                </NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink exact to="/" className="nav-link" activeClassName="active">
                                Signup
                            </NavLink>
                        </li>
                        {user ? (
                            <>
                                <li className="nav-item">
                                    <button className="nav-link btn btn-link" onClick={logoutUser}>
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item">
                                <NavLink to="/login" className="nav-link" activeClassName="active">
                                    Login
                                </NavLink>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
