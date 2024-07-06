import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../navebar";
import { useSelector } from "react-redux";
import "../view.css"; // Import external CSS file

function ViewPost() {
    const user = useSelector((store) => store.auth.user);
    const { postId } = useParams();
    const [post, setPost] = useState({ name: '', company: '', expiry_date: '' });

    useEffect(() => {
        axios.get(`https://medicalstore.mashupstack.com/api/medicine/${postId}`, {
            headers: { Authorization: "Bearer " + user.token },
        }).then(response => {
            setPost(response.data);
        }).catch(error => {
            console.error('Error fetching post:', error);
        });
    }, [postId, user.token]);

    return (
        <div>
            <Navbar />
            <div className="containeer">
                <div className="cardd">
                    <h3>{post.name}</h3>
                    <div><strong>Company:</strong> {post.company}</div>
                    <div><strong>Expiry Date:</strong> {post.expiry_date}</div>
                    <div className="action-buttons">
                        <Link to="/list" className="custom-btn">Back</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewPost;
