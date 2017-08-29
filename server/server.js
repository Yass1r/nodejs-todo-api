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
        } if(todo === null){
            res.status(404).send({ error: 'Record not found in DB.'});
        }
            else {
            res.send(JSON.stringify(todo, undefined,2));
        }
        });
    }
});

app.delete('/todo/:id', (req, res) => {
    var rec_id = req.params.id;
    var IDvalid = ObjectID.isValid(rec_id);
    if(!IDvalid){
        res.status(404).send('ID not valid!');
    } else {
        Todo.findByIdAndRemove(rec_id).then((docs)=> {
            if(docs === null){
                res.status(404).send('ID not found!');
            } else {
                res.send('Id is removed: ' +  docs);
            }
        });
    }
});

var port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

