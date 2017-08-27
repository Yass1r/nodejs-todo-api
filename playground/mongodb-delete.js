
//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://127.0.0.1:27017/TodoApp', (err, db) => {
    if(err){
        //return to stop when err occurs
        return console.log('[+] Unable to connect to Mongodb server!');
    } else {
        console.log('[+] Connected to MongoDB server');
    }

    //delete all records that has the following text
    // db.collection('Todos').deleteMany({text: 'Shop from Walmart'}).then((result) => {
    //     console.log(result);
    // });


    //delete one!
    // db.collection('Todos').deleteOne({text: 'Shop from Walmart'}).then((result) => {
    //     console.log(result);
    // });

    //find and delete
    db.collection('Users').findOneAndDelete({
        _id: new ObjectID('59a2e4f066ca9250185b7a53')
    }).then((result) => {
        console.log(result);
    });


    db.close();
});