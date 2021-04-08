const jwt = require("jsonwebtoken");
const accessToken = "weamalisima123nobeabieo100preiwa";

const sign = obj => jwt.sign(obj, accessToken);

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        console.log(token)
        jwt.verify(token, accessToken, (err, {id}) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.id = id;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports = { sign, authenticateJWT };