var express = require("express");
var app = express(); // express instance
var http = require('http');
var path = require('path');

var passport = require('passport');
//var paeesortSetup = require('./config/passport-setup');
var bodyparser = require("body-parser");
var fileupload = require('./api/fileupload');
var dbcontext = require('./dbcontext');

var eventDay = require('./api/eventapi')
var synonym = require('./api/synonymapi')

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));


app.use(passport.initialize());
app.use(passport.session());

app.use('/api/event',eventDay)
app.use('/api/synonym',synonym)


app.use('/picture',fileupload);
//app.use('/api/login',login);
//app.use('/api/notii', firebaseN)
app.use('/api/uploads',express.static(__dirname + '/api/uploads'));
app.use('/api/tmpUploads',express.static(__dirname + '/api/tmpUploads'));
const moment = require("moment");
 


app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something went wrong!!');
});


/*app.listen(5020,function(){
    console.log("listening to port 5020");
})*/

app.use(express.static(__dirname + '/bnArchieve'));

app.get('/*', (req, res) => res.sendFile(path.join(__dirname)));


const server = http.createServer(app);

server.listen(5020, () => console.log(`App running on: http://localhost:5020`));



