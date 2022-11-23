const { validationResult } = require('express-validator');
module.exports = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.session.formErrors = errors.mapped();
        req.session.formBody = req.body;
        return res.redirect('back')        
    }
    next()
}

module.exports