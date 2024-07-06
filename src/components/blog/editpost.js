import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../navebar";
import { useSelector } from "react-redux";
import "../edit.css"; // Import custom CSS file

function EditPost() {
    const { postId } = useParams();
    const user = useSelector((store) => store.auth.user);
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [expiry_date, setExpiryDate] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://medicalstore.mashupstack.com/api/medicine/${postId}`, {
            headers: { Authorization: "Bearer " + user.token },
        }).then(response => {
            setName(response.data.name);
            setCompany(response.data.company);
            setExpiryDate(response.data.expiry_date);
        }).catch(error => {
            console.error('Error fetching post:', error);
        });
    }, [postId, user.token]);

    function updatePost() {
        axios.post(`https://medicalstore.mashupstack.com/api/medicine/${postId}`, {
            name: name,
            company: company,
            expiry_date: expiry_date,
        }, {
            headers: { Authorization: "Bearer " + user.token },
        }).then(response => {
            alert(response.data.message);
            navigate('/list');
        }).catch(error => {
            console.error('Error updating post:', error);
        });
    }

    return (
        <div>
            <Navbar />
            <div className="edit-containner"id="boody">
                <h1 className="text-center">Edit Post</h1>
                <div className="edit-form-group">
                    <label className="edit-label">Medicine Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(event) => { setName(event.target.value) }}
                        className="edit-input"
                    />
                </div>
                <div className="edit-form-group">
                    <label className="edit-label">Company:</label>
                    <textarea
                        value={company}
                        onChange={(event) => { setCompany(event.target.value) }}
                        className="edit-input"
                        rows="3"
                    ></textarea>
                </div>
                <div className="edit-form-group">
                    <label className="edit-label">Expiry Date:</label>
                    <input
                        type="text"
                        value={expiry_date}
                        onChange={(event) => { setExpiryDate(event.target.value) }}
                        className="edit-input"
                    />
                </div>
                <div className="edit-button-container">
                    <button onClick={updatePost} className="edit-submit-btn">Submit</button>
                    <Link to="/list" className="edit-back-btn">Back</Link>
                </div>
            </div>
        </div>
    );
}

export default EditPost;
