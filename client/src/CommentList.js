import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);

  const [content, setContent] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();

    await axios.post(`http://localhost:3011/posts/${postId}/comments`, {
      content,
    });

    setContent('');
    await fetchData();
  };

  const fetchData = async () => {
    const res = await axios.get(
      `http://localhost:3011/posts/${postId}/comments`
    );

    setComments(res.data);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderedComments = comments.map((comment) => {
    return <li key={comment.id}>{comment.content}</li>;
  });

  return (
    <>
      <ul>{renderedComments}</ul>
      <div>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label>New Comment</label>
            <input
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className='form-control'
            />
          </div>
          <button className='btn btn-primary'>Submit</button>
        </form>
      </div>
    </>
  );
};

export default CommentList;
