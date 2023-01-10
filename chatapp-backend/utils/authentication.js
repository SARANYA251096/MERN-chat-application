const { expressjwt } = require('express-jwt');

exports.requireSignin = expressjwt({
    secret: process.env.SECRET_KEY,
    algorithms: ['HS256'],
    userProperty: 'auth'
});

exports.isAuth = (req, res, next) => {
    let user = req.auth._id === req.params.userId;
    if (!user) {
         return res.status(401).send({message:'UnAuthorized'})
    }
    next();
}