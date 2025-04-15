import React, {useState} from 'react';
import axios from "axios";
const CommentCreate = ({ postId }) => {
    const [content, setComment] = useState([]);

    const OnSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`http://localhost:4001/posts/${postId}/comments`, {content});
        setComment('');
    }
    return <div>
        <form onSubmit={OnSubmit}>
            <div className="form-group">
                <label>Add Comment</label>
                <input className="form-group" onChange={(e) => setComment(e.target.value) }/>
                <button className="btn btn-primary"> Submit </button>
            </div>
        </form>

    </div>


}

export default CommentCreate;