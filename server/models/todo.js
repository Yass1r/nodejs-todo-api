var mongoose = require('mongoose');

var Todo = mongoose.model('Todo',{
    text: {
        type: String,
        required: true,
        trim: true, //remove spaces
        minlength: 5
    },
    completed: {
        type: Boolean
        ,default: false
    },
    completed_at:{
        type: Number,
        default: null
    }
});

module.exports = {Todo};