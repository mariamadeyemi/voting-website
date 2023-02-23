
module.exports = (req, res, next) => {
    if(!req.session.admin){
        req.session.intent = req.url
        return res.send("<h1 style='text-align: center;'>Page Not Found</h1>");

    }
    next();
}