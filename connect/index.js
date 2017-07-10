// load mongoose package
var mongoose = require('mongoose');
// Use native Node promises
mongoose.Promise = global.Promise;

// connect to MongoDB
mongoose.connect('mongodb://localhost/travel')
  .then(() =>  console.log('connection mongoDB succesful'))
  .catch((err) => console.error(err));