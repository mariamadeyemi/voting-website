const bcrypt = require ("bcrypt");
const Admin = require ("../models/Admin");
const saltRounds = 10;

const addAdmin = async(req, res)=>{
    try {
        let admin = new Admin (req.body);
        bcrypt.hash(req.body.password, saltRounds, async(err, hash)=>{
          admin.password = hash;
          await admin.save();
        })  
        res.end("submitted successfully")
    } catch (error) {
       res.send(error.message); 
    }
  
  
}

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
        req.session.admin = admin.id
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

  module.exports = { adminForm, adminLogin, adminLogout, addAdmin }