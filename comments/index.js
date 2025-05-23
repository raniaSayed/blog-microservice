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
     const newComment = {
         id: randomBytes(4).toString('hex') ,
         content,
         status: 'pending',
     };

    const comments = commentsByPostId[id] || [];
    comments.push(newComment);
    commentsByPostId[id] = comments;
    await axios.post('http://event-bus-service:4005/events', {
        type: 'CommentCreated',
        data: {
            id: newComment.id,
            content,
            postId: req.params.id,
            status: 'pending',
        },
    }).catch((err) => {
        console.log({err});
    });

    res.send({postId: id, commentsByPostId: commentsByPostId[id]});
});

app.post('/events', async (req,res) => {
    console.log('Received Event:', req.body.type);
    const {type, data} = req.body;
    if(type === 'CommentModerated') {
        const {id, postId, status, content} = data;
        let comments = commentsByPostId[postId];
        const comment = comments.find((comment) => comment.id === id);
        comment.status = status;
        //send comment updated to query service
        await axios.post('http://event-bus-service:4005/events',{
            type: 'CommentUpdated',
            data:{
                id,
                postId,
                status,
                content,
            }
        }).catch(err => console.log(err.message))

    }
    res.send({text: ''});
});






app.listen(4001, () =>{
    console.log('Listening on port 4001')
})