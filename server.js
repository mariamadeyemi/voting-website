//jshint esversion:6
const express = require('express');
const app = express();
const fileUpload = require('express-fileUpload');
const Admin = require("./models/Admin");
const { voterForm, addVoter, voterLogin, viewDashboard, logout } = require('./controller/voterController');
const session = require('express-session');
const bcrypt = require('bcrypt');
const { candidateForm, addCandidate } = require('./controller/candidateController');
const { partyForm, addParty, getParties, getParty } = require('./controller/partyController');
const { electionForm, addElection } = require('./controller/electionController');
const partyValidators = require('./validators/partyValidator');
const flash = require('./helpers/req-flash');
const { adminForm, adminLogin, adminLogout, addAdmin } = require('./controller/adminController');
const registerValidators = require('./validators/registerValidator');
const { voteForm, getCandidate, addVote } = require('./controller/voteController');
const authenticate = require('./middlewares/authenticate');
const adminauth = require('./middlewares/adminauth');
app.use(express.urlencoded({ extended: true }))
app.use("/public", express.static('public'));
app.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp' }))
app.use(express.static('uploads'))
const sess = {
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: {}
}

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess))
app.use(flash);
app.use((req, res, next)=>{
  res.locals.formErrors = req.session?.formErrors
  delete req.session.formErrors;
  res.locals.formBody = req.session?.formBody
  res.locals.flash = req.session.flash;
  delete req.session.flash;
  res.locals.user_id = req.session.user_id
  next()
})



// set the view engine to ejs
app.set('view engine', 'ejs');

app.get("/", getParties)
app.get("/dashboard", authenticate, viewDashboard)
app.get("/admin-dashboard", adminauth, (req, res)=>{
  res.render("admin-dashboard");
})

app.get("/add-admin", (req, res)=>{
  res.render("add-admin");
})

app.get("/about", (req, res)=>{
  res.render("about");
})

app.post("/add-admin", addAdmin)

app.get("/user-login", (req, res)=>{
  res.render("user_login");
})
app.post("/user-login", voterLogin)

app.get("/register", voterForm)
app.post("/register", registerValidators, addVoter)
app.get("/add-candidate", candidateForm)
app.post("/add-candidate", addCandidate)
app.get("/add-party", partyForm)
app.post("/add-party", partyValidators, addParty)
app.get("/party/:id", getParty)
app.get("/add-election", electionForm)
app.post("/add-election", addElection)
app.get("/admin-login", adminForm)
app.post("/admin-login", adminLogin)
app.get("/admin-logout", adminLogout)
app.get("/profile", (req, res)=>{
  res.render("users-profile");
})
app.get("/vote", authenticate, voteForm)
app.post("/vote", addVote)
app.get("/candidate", (req, res)=>{
  res.render("candidate");
})

app.get("/candidate/:id", getCandidate)

app.get("/logout", logout)

app.get("/confirmation", (req, res)=>{
  res.render("confirmation");
})




app.listen(5000, ()=>{
  console.log('Server is listening on port 5000');
});