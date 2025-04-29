const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

app.post('/events', (req, res) => {
    const event = req.body;
    console.log({event})

    const services = [
        {url: 'http://localhost:4000/events', name: 'post service'},
        {url: 'http://localhost:4001/events', name: 'comment service'},
        {url: 'http://localhost:4002/events', name: 'query service'},
        {url: 'http://localhost:4003/events', name: 'moderation service'},
    ];
    const promises = services.map(({url, name}) => {
        return axios.post(url, event)
            .then(response => {
            console.log(`${name} responded with status ${response.status}`);
            })
            .catch(err => console.log(`${name} failed ${err.message}`) );
    });
    res.send({status: 'Ok'});
});


app.listen(4005, () => {
    console.log('Listening on port 4005...');
})
