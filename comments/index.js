const express=  require('express');
const app = express();
const bodyParser = require('body-parser');
const { randomBytes }  = require('crypto');
const cors = require('cors');
const axios = require('axios');
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res)=>{
    const id = req.params.id;
    res.status(201).send(commentsByPostId[id] ||  []);
});

app.post('/posts/:id/comments', async (req, res) => {
    const { content } = req.body;
    const id = req.params.id;
    console.log(JSON.stringify(commentsByPostId));
     const newComment = {id: randomBytes(4).toString('hex') , content};

    const comments = commentsByPostId[id] || [];
    comments.push(newComment);
    commentsByPostId[id] = comments;
    await axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: {
            id: newComment.id,
            content,
            postId: req.params.id,
        },
    }).catch((err) => {
        console.log({err});
    });

    res.send({postId: id, commentsByPostId: commentsByPostId[id]});
});

app.post('/events', (req,res) => {
    console.log('Received Event:', req.body.type);
    res.send({text: ''});
});






app.listen(4001, () =>{
    console.log('Listening on port 4001')
})