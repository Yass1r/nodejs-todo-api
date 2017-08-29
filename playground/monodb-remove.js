var {mongoose} = require('../server/db/mongoose');
var {Todo} = require('./../server/models/todo');
var {Users} = require('./../server/models/users');

var todo_id  = '59a5c897577bfb5718352196';
var email_id = '59a323961bcbac035202cf33';

// //remove everything in db
// Todo.remove({}).then((result)=> {
//     console.log(result);
// });

// //findAndRemove()
// Todo.findOneAndRemove({
//     _id: todo_id
// }, (docs)=> {
//     console.log(docs);
// });

// //removefindById
// Todo.findByIdAndRemove(todo_id).then((docs)=> {
//     console.log(docs)
// });


