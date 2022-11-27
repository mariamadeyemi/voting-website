const bcrypt = require ("bcrypt");
const Admin = require ("../models/Admin");

const adminForm = (req, res)=>{
    res.render("admin_login");
  }

const adminLogin = async (req, res) => {
    let { username, password } = req.body
    let admin = null
    let result = await Admin.fetch({ username })
    if (result.length > 0)
        admin = result[0]
    if (admin?.password && await bcrypt.compare(password, admin.password)) {
        req.session.user_id = admin.id
        res.redirect('/admin-dashboard')
    } else {
        req.flash('Error', "Invalid username or password")
        res.redirect('back')
    }
}

const adminLogout = (req, res) => {
    req.flash('Success', "Bye")
    delete req.session.user_id
    res.redirect('/')
}

  module.exports = { adminForm, adminLogin, adminLogout }