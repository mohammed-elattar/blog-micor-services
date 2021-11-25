import React, { useState } from 'react';
import axios from 'axios';
const PostCreate = () => {
  const [title, setTitle] = useState('');

  const onChange = (e) => {
    setTitle(e.target.val);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:3010/posts', { title });

    setTitle('');
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className='form-group mb-3'>
          <label className='form-label'>Title</label>
          <input
            type='text'
            className='form-control'
            value={title}
            onChange={(e) => onChange(e)}
          />
        </div>
        <button className='btn btn-primary'>Submit</button>
      </form>
    </div>
  );
};

export default PostCreate;
