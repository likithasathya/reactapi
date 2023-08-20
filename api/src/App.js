import React, { useEffect, useState } from "react";
import './App.css';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostBody, setNewPostBody] = useState('');

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        const postsData = await response.json();
        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }

    fetchPosts();
  }, []);

  const addPost = () => {
    const newPost = {
      userId: 1,
      id: posts.length + 1,
      title: newPostTitle,
      body: newPostBody
    };

    setPosts([...posts, newPost]);
    setNewPostTitle('');
    setNewPostBody('');
  };

  const deletePost = (postId) => {
    const updatedPosts = posts.filter(post => post.id !== postId);
    setPosts(updatedPosts);
  };

  return (
    <div className="App">
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <h1 className="mb-4 text-center">Posts</h1>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Title"
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <textarea
                className="form-control"
                placeholder="Body"
                value={newPostBody}
                onChange={(e) => setNewPostBody(e.target.value)}
              />
            </div>
            <button className="btn btn-primary" onClick={addPost}>Add Post</button>
          </div>
          <div className="col-md-6">
            <h2 className="mb-3">Posts List</h2>
            <div className="posts-list">
              {posts.map(post => (
                <div key={post.id} className="post card mb-3">
                  <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text">{post.body}</p>
                    <button className="btn btn-danger" onClick={() => deletePost(post.id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
