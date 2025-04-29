const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts = [];

//list of posts/ comments
app.get('/posts', (req, res) =>{
    // posts.map((post => post.comments.filter((comment) => comment.status === 'approved') )

    res.send(posts);
});


app.post('/events', (req, res) => {
    const {type, data} = req.body;
    if(type === 'PostCreated'){
        const {id, title} = data;
        posts.push({id, title, comments: []});
    }
    if(type === 'CommentCreated') {
        const {id, content, postId, status} = data;
        console.log({posts})
        console.log({postId})
        const post = posts.find((post) => postId === post.id);
        post.comments.push({id, content, status});
    }
    if(type === 'CommentUpdated') {
        const {id, postId, content, status} = data;
        console.log({data})
        console.log(JSON.stringify(posts))
        const post = posts.find((post) => post.id === postId);
        let updatedComment = post?.comments.find((comment) => comment.id === id);
        console.log({updatedComment})
        if(updatedComment.id){
            updatedComment.content = content;
            updatedComment.status = status;
        }
        console.log({post});
    }

        console.log(JSON.stringify(posts));
    res.send({});
});

app.listen(4002, () =>{
    console.log('Listening on 4002');
})
