const http = require('http');
const express = require('express');
const path = require('path');
const logger = require('morgan');

// Require router module here ...
const router = require('./prouter')

const app = express();

const port = process.env.PORT;

app.set('port', port);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use router module here ...

// 404 handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error handler
app.use((err, req, res) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    
    res.status(err.status || 500);
    res.render('error');
});

// Start the server
const server = http.createServer(app);
server.listen(port);
server.on('listening', () => {
    console.log('Application Ready!');
});
