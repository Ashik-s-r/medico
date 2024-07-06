import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../navebar";
import { useSelector } from "react-redux";
import "../add.css"; // Import renamed CSS file

function AddPost() {
    const user = useSelector((store) => store.auth.user);
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [expiry_date, setExpiryDate] = useState('');
    const navigate = useNavigate();

    function addPost() {
        axios.post('https://medicalstore.mashupstack.com/api/medicine',
           { name: name, company: company, expiry_date: expiry_date },
           { headers: { Authorization: "Bearer " + user.token } },
        ).then(response => {
            navigate('/list');
        });
    }

    return (
        <div className="addpost-body">
            <Navbar />
            <div className="addpost-containerrr">
                <div className="addpost-formContainer">
                    <h1>Add Medicine</h1>
                    <div className="addpost-form-group">
                        <label className="addpost-form-label">Medicine:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(event) => { setName(event.target.value); }}
                            className="addpost-form-control"
                        />
                    </div>
                    <div className="addpost-form-group">
                        <label className="addpost-form-label">Company:</label>
                        <input
                            value={company}
                            onChange={(event) => { setCompany(event.target.value); }}
                            className="addpost-form-control"
                        />
                    </div>
                    <div className="addpost-form-group">
                        <label className="addpost-form-label">Expiry Date:</label>
                        <input
                            type="date"
                            value={expiry_date}
                            onChange={(event) => { setExpiryDate(event.target.value); }}
                            className="addpost-form-control"
                        />
                    </div>
                    <div className="">
                    <Link to="/list" className="btn btn-primary">Back</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button onClick={addPost}  type="button"
                                className="btn btn-primary ">Submit</button>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddPost;
