import React, {useState} from 'react';
import axios from "axios";

const PostCreate = () => {
    const [title, setTitle] = useState('');
   const onSubmit = async (event) => {
        console.log({event})
        event.preventDefault();
        await axios.post('http://posts.com/posts/create', {
            title
        });
        console.log({title});
        setTitle('');
       console.log({title});
   }
    return <div>
        <form className='formGroup' onSubmit={onSubmit}>
            <div>
                <label>Title</label>
                <input className="form-control"
                onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <button className="btn btn-primary"> Submit</button>
        </form>
    </div>;
};
export default PostCreate;