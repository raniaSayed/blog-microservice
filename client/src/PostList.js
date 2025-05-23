import React, {useState, useEffect} from 'react';
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";
const PostList = () => {
    const [posts, setPosts] = useState([]);
    const fetchPosts = async () => {
        const res = await axios.get("http://posts.com/posts");
        console.log({res: res.data});
        setPosts(res.data);
    }
    //This hook allows you to perform side effects in your function components,
    // such as fetching data,
    // subscribing to events,
    // or manually changing the DOM.

    //The second argument is an empty array [].
    // This means that the effect will only run once when the component mounts,
    // similar to componentDidMount in class components.
    // It will not run again on subsequent renders.
    useEffect(() => {
        fetchPosts();
        },[]);

    console.log({posts})
    const renderedPosts = Object.values(posts).map((post) =>{
        console.log({post})
        console.log({comments: post.comments})
        return <div className="card" style={{
           width: "30%", marginBottom: "20px"
        }} key={post.id}>

            <div className="card-body">
                <h3>{post.title}</h3>
                <CommentList comments={post.comments} />
                <CommentCreate postId={post.id} />

            </div>
        </div>
    })


    return <div className="d-flex flex-row flex-wrap justify-content-between">{renderedPosts}</div>
}

export default PostList;