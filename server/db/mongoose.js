var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//Fixing err by using useMongoCLient to true
mongoose.connect('mongodb://127.0.0.1:27017/TodoApp',{
    useMongoClient: true,
});

module.exports = {mongoose};