const express = require('express');
const { randomBytes }  = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const app = express();
app.use(bodyParser.json());
app.use(cors());
const posts = {};

app.get('/posts', (req, res) =>{
    res.send(posts);

});

app.post('/posts', async (req, res)=>{
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;
    posts[id] = {
        id, title
    };
    await axios.post('http://event-bus-service:4005/events', {
        type: 'PostCreated',
        data: posts[id],
    }).catch((err) => {
        console.log({err});
    });
    res.status(201).send(posts[id]);
});

app.post('/events', (req,res) => {
    console.log('Received Event:', req.body.type);
    res.send({})
});

app.listen(4000, () =>{
    console.log('hello from posts...');
    console.log('Listening on port 4000');
})