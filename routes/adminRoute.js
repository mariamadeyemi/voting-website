const { Router } = require('express');
const { addAdmin, adminForm, adminLogin, adminLogout } = require('../controller/adminController');
const adminauth = require('../middlewares/adminauth');
const router = Router();

router.get("/admin-dashboard", adminauth, (req, res)=>{
    res.render("admin-dashboard");
  })
  
router.get("/add-admin", (req, res)=>{
    res.render("add-admin");
  })

router.post("/add-admin", addAdmin)
router.get("/admin-login", adminForm)
router.post("/admin-login", adminLogin)
router.get("/admin-logout", adminLogout)

module.exports = router
