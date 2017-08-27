
//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://127.0.0.1:27017/TodoApp', (err, db) => {
    if(err){
        //return to stop when err occurs
        return console.log('[+] Unable to connect to Mongodb server!');
    } else {
        console.log('[+] Connected to MongoDB server');
    }

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) =>{
    //     if(err){
    //         return console.log('Unable to insert Todo', err);
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    // db.collection('Users').insertOne({
    //     user: 'Yasir',
    //     age: 35,
    //     location: 'IRAQ'
    // }, (err, result) => {
    //     if(err){
    //         return console.log('Unable to insert!');
    //     }
    //     //print _id object
    //     console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
    // });


    db.close();
});