var {mongoose} = require('../server/db/mongoose');
var {Todo} = require('./../server/models/todo');
var {Users} = require('./../server/models/users');

var todo_id  = '59a35a09cf722004969f9824';
var email_id = '59a323961bcbac035202cf33';

//Find all records
// Users.find().then((todos) => {
//     console.log(JSON.stringify(todos, undefined,2));
// }, (err)=> {
//     console.log(err);
// });

// //Find first match - since we find by id then is unique.
// Users.findOne({
//     _id: '59a323961bcbac035202cf33'
// }).then((user)=> {
//     console.log(user);
// }, (err)=> {
//     console.log(err);
// });

//find by id
Users.findById(email_id, (err, user)=>{
    if(err){
        return console.log('Unable to retrieve user!');
    } else {
        console.log(user.email);
    }
});

