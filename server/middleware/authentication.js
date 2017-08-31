var {Users} = require('./../models/users');
//function to make any route private 
var authentication = (req, res, next) => {
    var token = req.header('x-auth');
    
        Users.findByToken(token).then((user)=> {
            if(!user){
                return Promise.reject();
            }
        req.user = user;
        req.token = token;
        next();
        }).catch((err)=> {
            res.status(401).send();
        });
};

module.exports = { authentication };