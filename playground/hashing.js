const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

// var password = 'password123';
// var hash = SHA256(password).toString();


var data = {
    id: 4
};

var token = jwt.sign(data, 'secret');

var decoder = jwt.verify(token, 'secret');

console.log(token);

console.log(decoder);

// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'secretn').toString()
// };

// // //if an attacker manipulate values and send it back! but they don't know the salt (challenge key)
// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(data)).toString();

// resuted_hash = SHA256(JSON.stringify(token.data) + 'secret').toString();

// console.log(`Hash: ${token.hash.toString()}`)
// console.log(`Hash: ${resuted_hash}`)

// if (resuted_hash === token.hash){
//     return console.log('Not modified');
// } else {
//     console.log('Modified');
// }



