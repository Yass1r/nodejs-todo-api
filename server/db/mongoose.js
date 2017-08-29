var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//Fixing err by using useMongoCLient to true
var mongodbConn = process.env.MONGODB_URI ||'mongodb://127.0.0.1:27017/TodoApp';
mongoose.connect(mongodbConn,{
    useMongoClient: true,
});

module.exports = {mongoose};