
//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://127.0.0.1:27017/TodoApp', (err, db) => {
    if(err){
        //return to stop when err occurs
        return console.log('[+] Unable to connect to Mongodb server!');
    } else {
        console.log('[+] Connected to MongoDB server');
    }

  
    

    // db.collection('Todos').find().count().then((count) => {
    //     console.log('Todos:\n--\n');
    //     console.log(`Todos Counts: ${count}`);
    // }), (err) => {
    //     console.log('Unable to fetch todos', err);
    // };

    db.collection('Users').find({user: 'Amro'}).toArray().then((users) => {
        console.log(JSON.stringify(users, undefined,2));
    });

    db.close();
});