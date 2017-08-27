//library import
const express = require('express');
const bodyParser = require('body-parser');
//local import
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {Users} = require('./models/users');

var app = express();

app.use(bodyParser.json());

app.post('/todo', (req, res)=>{
    console.log(`Received new Todo: ${req.body.text}`);
    var received_todo = new Todo({
        text: req.body.text
    });

    received_todo.save().then((docs)=>{
        res.send(docs);
    }, (err)=> {
        if(err){
            res.status(400).send(err);
        }
    });
});



app.listen(3000, () => {
    console.log('Started on port 3000');
})

