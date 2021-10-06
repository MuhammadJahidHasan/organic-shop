const jwt = require('jsonwebtoken');

const checkUserLogin = (req, res, next) => {
    const cookie = Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;
    if (cookie) {
        try {
            const token = cookie[process.env.COOKIE_NAME];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (err) {
            res.status(401).json({
                msg: 'Authentication failed',
            });
        }
    } else {
        res.status(401).json({
            msg: 'Authentication failed',
        });
    }
};

const requiredRole = (role) => (req, res, next) => {
    if (req.user.role === role.includes(req.user.role)) {
        next();
    } else {
        res.status(401).json({
            msg: 'Unauthorizes user',
        });
    }
};

module.exports = { checkUserLogin, requiredRole };
