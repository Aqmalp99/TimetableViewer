const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config('../.env');

// .env needs to be fixed

module.exports = function jwtTokens({username,role,id, student_id}){
    const user = {username,role,id, student_id};
    // const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET,{expiresIn:'15m'});
    // const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET,{expiresIn:'15m'});
    const accessToken = jwt.sign(user, "asdasdad",{expiresIn:'15m'});
    const refreshToken = jwt.sign(user, "ajsda6sdagkd",{expiresIn:'15m'});
    return({accessToken,refreshToken});
}


