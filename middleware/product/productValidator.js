const { check, validationResult } = require('express-validator');

const doProductValidator = [
    check('title').isLength({ min: 1 }).withMessage('product title requried'),

    check('price').isNumeric().withMessage('product price requried'),

    check('brand').isLength({ min: 1 }).withMessage('product brand requried'),

    check('category').isLength({ min: 1 }).withMessage('product category requried'),
];

const doProductValidationHandler = (req, res, next) => {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();
    if (Object.keys(mappedErrors).length === 0) {
        next();
    } else {
        res.status(500).json({
            error: mappedErrors,
        });
    }
};

module.exports = {
    doProductValidator,
    doProductValidationHandler,
};
