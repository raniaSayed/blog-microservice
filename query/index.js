const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts = [];

//list of posts/ comments
app.get('/posts', (req, res) =>{
    res.send(posts);
});

const handleEvents = ({data, type}) => {
    if(type === 'PostCreated'){
        const {id, title} = data;
        posts.push({id, title, comments: []});
    }
    if(type === 'CommentCreated') {
        const {id, content, postId, status} = data;
        const post = posts.find((post) => postId === post.id);
        post.comments.push({id, content, status});
    }
    if(type === 'CommentUpdated') {
        const {id, postId, content, status} = data;
        const post = posts.find((post) => post.id === postId);
        let updatedComment = post?.comments.find((comment) => comment.id === id);
        if(updatedComment.id){
            updatedComment.content = content;
            updatedComment.status = status;
        }
    }
}

app.post('/events', (req, res) => {
    const {type, data} = req.body;
    handleEvents({ data, type });


    res.send({});
});

app.listen(4002, async () =>{
    console.log('Listening on 4002');

    const events = await axios.get('http://localhost:4005/events');
    events.data.map((e) => {
    console.log(`Event Processing: ${e.type}`)
    handleEvents({data: e.data, type: e.type});
    });
});
