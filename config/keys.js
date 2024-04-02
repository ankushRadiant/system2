require("dotenv").config();
// console.log(process.env.DEV_PORT);

switch(process.env.NODE_ENV){
    case 'development':
        module.exports = require('./development');
    break;
    
}

