const express = require('express');
const app = express();
const fileUpload = require('express-fileUpload');
const Admin = require("./models/Admin");
const { voterForm, addVoter } = require('./controller/voterController');
const session = require('express-session');
const bcrypt = require('bcrypt');
const { candidateForm, addCandidate } = require('./controller/candidateController');
const { partyForm, addParty, getParties, getParty } = require('./controller/partyController');
const { electionForm, addElection } = require('./controller/electionController');
const partyValidators = require('./validators/partyValidator');
const flash = require('./helpers/req-flash');
const { adminForm, adminLogin, adminLogout } = require('./controller/adminController');
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
app.get("/dashboard", (req, res
  )=>{
  res.render("dashboard");
})
app.get("/admin-dashboard", (req, res)=>{
  res.render("admin-dashboard");
})
app.get("/user-login", (req, res)=>{
  res.render("user-login");
})

app.get("/register", voterForm)
app.post("/register", addVoter)
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
app.get("/vote", (req, res)=>{
  res.render("votingpage");
})
app.get("/candidate", (req, res)=>{
  res.render("candidate");
})





app.listen(5000, ()=>{
  console.log('Server is listening on port 5000');
});