import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentList from './CommentList';

const PostList = () => {
  const [posts, setPosts] = useState({});
  const [title, setTitle] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();

    await axios.post('http://localhost:3010/posts', {
      title,
    });

    setTitle('');
    await fetchPosts();
  };

  const fetchPosts = async () => {
    const res = await axios.get('http://localhost:3010/posts');

    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div
        className='card'
        style={{ width: '30%', marginBottom: '20px' }}
        key={post.id}
      >
        <div className='card-body'>
          <h3>{post.title}</h3>
          <CommentList postId={post.id} />
        </div>
      </div>
    );
  });

  return (
    <>
      <h1>Create Post</h1>
      <div>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label>Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='form-control'
            />
          </div>
          <button className='btn btn-primary'>Submit</button>
        </form>
      </div>
      <hr />
      <h1>Posts</h1>
      <div className='d-flex flex-row flex-wrap justify-content-between'>
        {renderedPosts}
      </div>
    </>
  );
};

export default PostList;
