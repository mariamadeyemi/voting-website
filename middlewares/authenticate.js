module.exports = (req, res, next) => {
    if (!req.session.user_id) { 
        req.session.intent = req.url
        return res.redirect('/user-login');
    }
    next();
}