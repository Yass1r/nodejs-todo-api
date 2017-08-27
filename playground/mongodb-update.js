
//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://127.0.0.1:27017/TodoApp', (err, db) => {
    if(err){
        //return to stop when err occurs
        return console.log('[+] Unable to connect to Mongodb server!');
    } else {
        console.log('[+] Connected to MongoDB server');
    }

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('59a2e23366ca9250185b797f')
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // });

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('59a2e5e866ca9250185b7a82')
    }, {
        $set: {
            name: 'Mohammed'
        }, $inc: {
            age: 3
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });

    db.close();
});