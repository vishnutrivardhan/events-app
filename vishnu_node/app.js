const http = require('http');
const path = require('path');
const fs = require('fs');
// Import event model
const event_model = require('./events.model');
// mongoose
const mongoose = require('mongoose');
// connect to mongoose
const mongo_url = 'mongodb+srv://vishnu:Vishnu1243@events-app.1pyjefz.mongodb.net/events?retryWrites=true&w=majority';
mongoose.connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('MongoDB connected successfully')).catch(err => console.log(err));
const server = http.createServer((req, res) => {
    if (req.url === '/api' || req.url === '/api/') {
        event_model.find().then(events => {
            res.setHeader("Access-Control-Allow-Origin", '*')
            res.writeHead(200, { "Content-Type": 'application/json' });
            res.end(JSON.stringify(events));
        });
    }
    else {
        let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
        let extname = path.extname(filePath)
        switch (extname) {
            case '.css':
                contentType = 'text/css';
                break;
            case '.js':
                contentType = 'text/javascript';
                break;
            case '.json':
                contentType = 'application/json';
                break;
            case '.html':
                contentType = 'text/html';
                break

        }
        fs.readFile(filePath, (err, content) => {
            if (err) {
                if (err.code = 'ENONET') { // file dont exist 
                    // display the 404 page here
                    fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                        res.setHeader("Access-Control-Allow-Origin", '*')
                        res.writeHead(200, { "Content-Type": 'text/html' });
                        res.end(content, 'utf-8')
                    });

                }
                else {
                    res.writeHead(500);
                    res.end(`server error ${err.code}`);
                }
            } else {
                res.setHeader("Access-Control-Allow-Origin", '*')
                res.writeHead(200, { 'Content-Type': contentType })
                res.end(content, 'utf-8')
            }
        });
    }
});
const PORT = process.env.PORT || 80;
server.listen(PORT, () => console.log(`Server is running successfully and the port number is ${PORT}`))



