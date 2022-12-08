// Create express server
const express = require('express');
// Mongoose
const mongoose = require('mongoose');
// Cors
const cors = require('cors');
// body-parser
const bodyParser = require('body-parser');

const app = express();

const mongo_url = 'mongodb+srv://vishnu:Vishnu1243@events-app.1pyjefz.mongodb.net/events?retryWrites=true&w=majority';
// Cors
app.use(cors());
// body-parser
app.use(bodyParser.json());
const port = process.env.PORT || 80;
const path = require('path');
const http = require('http');

const data = require('./public/events.json');
const event_model = require('./events.model');


let events = data;


app.use('/api', express.static(path.join(__dirname, '/../vishnu_vue/dist/')));
app.use(express.static(path.join(__dirname, '/public/')));

http.createServer(app).listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// Connect to MongoDB
mongoose.connect(mongo_url, { useNewUrlParser: true }).then((data) => {
    console.log('Connected to MongoDB');
}).catch((er) => {
    console.log(er);
})

// app.use('/api', express.static('dist'));
// Serve dist folder on /api
// API
// Get events
app.get('/api/events', (req, res) => {
    event_model.find({}, (er, data) => {
        res.json(data);
    })
});

// Add event
app.post('/api/add-event', (req, res) => {
    console.log('in add event');
    const event = req.body;
    // add id to event
    event.id = Math.floor(Math.random() * 10000);
    event_model.create(event, (er, data) => {
        if (er) {
            console.log(er);
        }
        res.json(data);
    })
});

// Delete event
app.delete('/api/delete-event/:id', (req, res) => {
    const id = req.params.id;
    event_model.findOneAndDelete({ id: id }, (er, data) => {
        res.json(data);
    })
});