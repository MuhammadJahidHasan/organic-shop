const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/people');

const addUser = async (req, res) => {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
        ...req.body,
        password: hashPassword,
    });
    try {
        await user.save();
        res.status(200).json({
            msg: 'user signup successfull',
        });
    } catch (err) {
        res.status(500).json({
            msg: err,
        });
    }
};

const login = async (req, res) => {
    try {
        const user = await User.findOne({
            $or: [{ email: req.body.email }, { mobile: req.body.mobile }],
        });
        if (user && user._id) {
            const isValidPass = await bcrypt.compare(req.body.password, user.password);
            if (isValidPass) {
                const userObj = {
                    userid: user._id,
                    username: user.name,
                    email: user.email,
                    mobile: user.mobile,
                    role: user.role || 'user',
                };
                const token = jwt.sign(userObj, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES,
                });
                res.cookie(process.env.COOKIE_NAME, token, {
                    maxAge: process.env.JWT_EXPIRES,
                    httpOnly: true,
                    signed: true,
                });
                res.status(200).json({
                    msg: 'Login successfull',
                });
            } else {
                res.status(401).json({
                    error: 'login failed',
                });
            }
        } else {
            res.status(401).json({
                error: 'login failed',
            });
        }
    } catch (err) {
        res.status(500).json({
            error: err,
        });
    }
};

const logout = (req, res) => {
    res.clearCookie(process.env.COOKIE_NAME);
    res.status(200).json({
        msg: 'Logout successfully',
    });
};

module.exports = {
    addUser,
    login,
    logout,
};
