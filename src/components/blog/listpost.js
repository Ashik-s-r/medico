import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../navebar";
import DeleteListitem from "./delete";
import { useSelector } from "react-redux";
import checkAuth from "../auth/checkAuth";
import "../listpost.css"; // Import your external CSS file

function Listposts() {
  const user = useSelector((store) => store.auth.user);
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchPost, setSearchPost] = useState("");

  const fetchPosts = useCallback(() => {
    if (user) {
      axios
        .get("https://medicalstore.mashupstack.com/api/medicine", {
          headers: { Authorization: "Bearer " + user.token },
        })
        .then((response) => {
          setPosts(response.data);
          setFilteredPosts(response.data);
        })
        .catch((error) => {
          console.error("Failed to fetch posts:", error);
        });
    }
  }, [user]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const search = (event) => {
    setSearchPost(event.target.value);
  };

  const searchClick = (event) => {
    event.preventDefault();
    if (searchPost.trim() === "") {
      setFilteredPosts(posts);
    } else {
      const filteredItems = posts.filter((item) =>
        item.name && item.name.toLowerCase().includes(searchPost.toLowerCase())
      );
      setFilteredPosts(filteredItems);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="list-container">
        <form className="search-form" onSubmit={searchClick}>
          <input
            type="text"
            value={searchPost}
            onChange={search}
            placeholder="Search..."
            className="search-input"
          />
          <button type="submit" className="search-btn">
            Search
          </button>
        </form>
        <h1 className="list-title">Medicine</h1>
        <div className="action-buttons">
          <Link to="/add" className="custom-btn primary-btn">
            Add Medicine
          </Link>
        </div>
        <div className="list-content">
          {filteredPosts.length === 0 ? (
            <h3 className="no-matching">No matching posts found.</h3>
          ) : (
            filteredPosts.map((post) => (
              <DeleteListitem key={post.id} post={post} refresh={fetchPosts} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default checkAuth(Listposts);
