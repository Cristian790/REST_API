//------------------------------------------------Impport Modules
//Express
const express = require('express');
//Body Parser
const bodyParser = require('body-parser');
//Database url
const config = require('./config/database');
//Mongoose
const mongoose = require('mongoose');

//-------------------------------------------------Init express
const app = express();


//-------------------------------------------------Connect database
mongoose.connect(config.database);
let db = mongoose.connection;
//Check Connection
db.once('open',()=>console.log('Connected to MongoDB'));
//Check for DB errors
db.on('error',err=>console.log(err));
//Promises
mongoose.Promise=global.Promise;


//-------------------------------------------------Middleware
//Body parser
app.use(bodyParser.json());

//-------------------------------------------------Import Route
const api = require('./routes/api');
app.use('/api',api);

//-------------------------------------------------Error Handling
app.use(function(err,req,res,next){
	res.status(422).send({error:err.message});
});

//-------------------------------------------------Setup port
app.listen(4000,()=>console.log('Server running on port 4000'));