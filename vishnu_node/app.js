const http = require('http');
const fs = require('fs').promises;
const path = require('path');
var static = require('node-static'); // From node documentation
const { default: mongoose } = require('mongoose');
const event_model = require('./events.model');
var qs = require('querystring');


const mongo_url = 'mongodb+srv://vishnu:Vishnu1243@events-app.1pyjefz.mongodb.net/events?retryWrites=true&w=majority';


var fileServer = new static.Server('./public');
var fileServer2 = new static.Server('../vishnu_vue/dist');

const server = http.createServer((req, res) => {
    if (req.method === 'OPTIONS') {
        console.log('!OPTIONS');
        var headers = {};
        // IE8 does not allow domains to be specified, just the *
        // headers["Access-Control-Allow-Origin"] = req.headers.origin;
        headers["Access-Control-Allow-Origin"] = "*";
        headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
        headers["Access-Control-Allow-Credentials"] = false;
        headers["Access-Control-Max-Age"] = '86400'; // 24 hours
        headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
        res.writeHead(200, headers);
        res.end();
    } else {
        //...other requests
        req.addListener('end', function () {
            // cors
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
            res.setHeader('Access-Control-Allow-Credentials', true);


            if (req.url === '/api') {

                event_model.find({}, (er, data) => {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(data));
                });

            }
            // add event post request
            else if (req.url === '/api/add-event') {
                console.log('add-event');
                console.log(req.method);
                if (req.method === 'POST') {
                    console.log('post');
                    let body = '';

                    req.on('data', (chunk) => {
                        console.log(chunk.toString());
                        body += chunk.toString();
                    });
                    const event = qs.parse(body);
                    console.log(event);
                    // const event = JSON.parse(body);
                    const new_event = new event_model(event);
                    new_event.save().then((data) => {
                        console.log(data);
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify(data));
                    }).catch((er) => {
                        res.writeHead(404, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify(er));
                    });
                    req.on('end', () => {
                    });
                }

            }


            else if (req.url === '/api/delete-event/:id') {

                // mongoose findOneAndDelete and send events data
                const id = req.params.id;
                event_model.findOneAndDelete({ id: id }, (er, data) => {
                    if (er) {
                        res.statusCode = 404;
                        res.end();
                    }
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(data));
                });
            }
            else if (req.url === '/api/events') {

                // mongoose find and send events data
                event_model.find({}, (er, data) => {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(data));
                });
            }
            if (req.url === '/') {

                fileServer.serve(req, res);
                // fileServer.serve(req, res);
            }

        }).resume();
    }


});

const port = process.env.PORT || 5959;

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// Connect to MongoDB
mongoose.connect(mongo_url, { useNewUrlParser: true }).then((data) => {
    console.log('Connected to MongoDB');
}).catch((er) => {
    console.log(er);
})


