const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts = [];

//list of posts/ comments
app.get('/posts', (req, res) =>{
    res.send(posts)
});


app.post('/events', (req, res) => {
    const {type, data} = req.body;
    if(type === 'PostCreated'){
        const {id, title} = data;
        posts.push({id, title, comments: []});
    }
    if(type === 'CommentCreated') {
        const {id, content, postId} = data;
        console.log({posts})
        console.log({postId})
        const post = posts.find((post) => postId === post.id);
        post.comments.push({id, content});
    }
    console.log(JSON.stringify(posts));
    res.send({});
});

app.listen(4002, () =>{
    console.log('Listening on 4002');
})
