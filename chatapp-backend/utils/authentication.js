// const { expressjwt } = require('express-jwt');
const jwt = require('jsonwebtoken');

// exports.requireSignin = expressjwt({
//     secret: process.env.SECRET_KEY,
//     algorithms: ['HS256'],
//     userProperty: 'auth'
// });

exports.isAuth = async (req, res, next) => {
    const { cookies } = req;
    // console.log("cookies: ", cookies);
    const data = await jwt.verify(cookies.accessToken, process.env.SECRET_KEY);
    console.log("Decrypted Data: ", data._id);
    req.id = data._id;
    // let user = req.auth._id;
    if (!req.id) {
        return res.status(401).send({ message: 'UnAuthorized' });
    }
    next();
}