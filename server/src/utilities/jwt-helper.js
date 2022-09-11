const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();


const jwtTokens= (username,role)=>{
    const user = {username,role};
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET,{expiresIn:'15m'});
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET,{expiresIn:'15m'});
    return({accessToken,refreshToken});
}

exports.module = jwtTokens ;

