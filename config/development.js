require("dotenv").config()
// console.log(process.env.DEV_PORT)
module.exports = {
    MONGOURI: process.env.MONGOURI,
    PORT:process.env.DEV_PORT,
    SESSION_VALUE: process.env.SESSION_VALUE,
    JWT_SECRET: process.env.JWT_SECRET,
};
