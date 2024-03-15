const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET;


const verify = function (req, res, next) {
    let token = req.headers.Authorization || req.headers.authorization;
    if (!token) {
        console.error('wrong token');
        return res.status(400).json({ message: "wrong token!!" });
    }

    token = token.split(' ')[1];
    try {
        const decoded = jwt.verify(token, secretKey);
        console.log(decoded);
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: "wrong token!!" });
    }

    next();
}

module.exports = verify;