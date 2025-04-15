const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

app.post('/events', (req, res) => {
    const event = req.body;
    console.log({event})
     axios.post('http://localhost:4000/events', event);//post service
     axios.post('http://localhost:4001/events', event);//comment service
     axios.post('http://localhost:4002/events', event);//query service
    res.send({status: 'Ok'});
});


app.listen(4005, () => {
    console.log('Listening on port 4005...');
})
