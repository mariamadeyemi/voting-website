const flash = require("./flash")

module.exports = (req, res, next)=>{
    req.flash = flash
    next()
}