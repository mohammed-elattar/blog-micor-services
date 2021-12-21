import React, { useState } from 'react';

const CommentList = ({ postId, comments, addComment }) => {
  const [content, setContent] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    addComment({ postId, content });
    setContent('');
  };

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
