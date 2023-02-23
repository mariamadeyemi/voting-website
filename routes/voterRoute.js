const { Router } = require('express');
const { voterLogin, verify, voterForm, addVoter, viewDashboard, logout, viewProfile } = require('../controller/voterController');
const authenticate = require('../middlewares/authenticate');
const registerValidators = require('../validators/registerValidator');

const router = Router();

router.get("/user-login", (req, res)=>{
    res.render("user_login");
  })
  router.post("/user-login", voterLogin)
  router.get("/verify_email", verify)
  router.get("/register", voterForm)
  router.post("/register", registerValidators, addVoter)
router.get("/dashboard", authenticate, viewDashboard)
router.get("/logout", logout)

router.get("/profile", viewProfile)


module.exports = router