//library import
const express = require('express');
const bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

//local import
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {Users} = require('./models/users');
var {authentication} = require('./middleware/authentication');

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
    var id = req.params.id;
    var IDvalid = ObjectID.isValid(id);
    if(!IDvalid){
        return res.status(404).send('ID not valid!');
    } else {
        Todo.findByIdAndRemove(id).then((todo)=> {
            if(todo === null){
                return res.status(404).send('ID not found!');
            } else {
                res.send(todo);
            }
        });
    }
});

app.patch('/todo/:id',(req, res) => {
    var id = req.params.id;
    var check_id = ObjectID.isValid(id);
    if(!check_id){
        return res.status(404).send('ID invalid');
    } else {
    
        //pick is useful specailly to pick only two objects text, and completed no others!
        var body = _.pick(req.body, ['text','completed']);
    
        //check compelted values
        if(_.isBoolean(body.completed) && body.completed){
            body.completed_at = new Date().getTime();
        } else {
            body.completed = false;
            body.completed_at = null;
        }
        Todo.findByIdAndUpdate(id, {$set: body},{new: true}).then((todo) => {
            res.send(todo);
        });

        res.send(body);
    }

});

app.post('/user', (req, res)=>{
    var body = _.pick(req.body, ['email','password']);
   
    var user = new Users({
        email: body.email,
        password: body.password
    });

    Users.findByToken
    user.generateAuthToken;

    user.save().then(()=>{
        //res.send(`Registered successfuly! ${user}`);
        return user.generateAuthToken();
    }).then((token) =>{
        res.header('x-auth', token).send(user);
    }).catch(
        (err) => {
            return res.status(404).send(err.message);
        }
    );
});
//private route using authentication function
app.get('/users/me', authentication, (req, res)=> {
    res.send(req.user);
});

app.post('/user/login', (req, res)=>  {
    
    var body = _.pick(req.body, ['email','password']);
    var email = body.email;
    var password = body.password;

   Users.findOne({'email': email}).then((result)=> {
       if(!result){ 
           return res.status(400).send('User Not found!');
        }
    //user found
        //retreive hashed pass from db
        var retreived_user = Users.findOne({ email }).then((user) => {
            bcrypt.compare(password, user.password, (err, result) => {
                if(result){
                    user.generateAuthToken().then((token) => {
                        res.header('x-auth', token).send(user);                        
                    });
                } else {
                    res.send(400).send();
                }
                }); //end comapre
            }); // end findOne
    }); // end compare
});

app.delete('/users/me/token', authentication, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.send();
    }, () => {
        res.status(400).send;
    });
});

var port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

