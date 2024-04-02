const jwt = require('jsonwebtoken');
const config = require('../config/config');
const { JWT_SECRET } = require("../config/keys");
const tokenBlacklist = [];

exports.auth = async (req , res , next) => {

    try {

        const { token } = req.headers
        if (!token) {
            return res.status(403).json({ message: 'Unauthorized', status:401 });
        }
        if (tokenBlacklist.includes(token)) {
            return res.status(401).json({ message: 'Token has been revoked', status:401 });
        }
        
        jwt.verify(token, JWT_SECRET, function(err, decodedToken){

            if (err) {
                return res.send({message: 'Token is invalid', status :401});
            }

            const currentTime = Math.floor(Date.now() / 1000);
            if (decodedToken.exp < currentTime) {
                return res.status(401).json({ message: 'Token has expired' });
            }

            // req.headers = decodedToken;
            next()
            
        });
    } catch (err) {
        console.error(err);
        return res.send({
            'msg':err.message,
            'status':500,
        });
    }
    
}

