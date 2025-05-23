const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
//no cors required here as no frontend calls.


//commentCreated should be moderated.
app.post('/events', async (req, res) => {
   const {type, data} = req.body;
    console.log('Received Event:', req.body.type);
    if(type === 'CommentCreated'){
       const status = (data.content.indexOf('orange') > -1)?
            'rejected': 'approved';

       data.status = status;
       await axios.post('http://event-bus-service:4005/events',
           {
           data,
           type: 'CommentModerated',
           });//event bus service

   }

    res.send(data);

})//.catch((err) => console.log(err.message));


app.listen(4003, () => {
    console.log('Starting moderation service on... 4003')
})

