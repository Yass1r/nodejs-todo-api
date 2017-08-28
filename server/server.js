//library import
const express = require('express');
const bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
var process = require('process');
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


//fetch all data via get 
app.get('/todo',(req, res)=> {
    Todo.find().then((todos)=> {
        console.log(todos);
        res.send({todos});
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get('/todo/:id',(req, res)=> {
    var received_id = req.params.id;
    var status = ObjectID.isValid(received_id);
    if(!status){
        return res.status(404).send({Error: 'ID not found!'});
    } else {
        var query_todo = Todo.findById(received_id, (err, todo)=> {
        if(err){
            return res.status(404).send(err);
        } else {
            res.send(JSON.stringify(todo, undefined,2));
        }
        });
    }
});
var port = process.env.PORT || 3000;
app.listen(3000, () => {
    console.log(`Started on port ${port}`);
})

