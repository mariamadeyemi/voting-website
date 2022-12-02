
module.exports = (req, res, next) => {
    if(!req.session.admin){
        req.session.intent = req.url
        return res.send("You are not authorized");

    }
    next();
}