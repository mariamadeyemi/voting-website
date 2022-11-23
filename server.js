const express = require('express');
const app = express();
const fileUpload = require('express-fileUpload');
const Admin = require("./models/Admin");
const { voterForm, addVoter } = require('./controller/voterController');
const session = require('express-session');
const bcrypt = require('bcrypt');
const { candidateForm, addCandidate } = require('./controller/candidateController');
const { partyForm, addParty } = require('./controller/partyController');
const { electionForm, addElection } = require('./controller/electionController');
const partyValidators = require('./validators/partyValidator');

app.use(express.urlencoded({ extended: true }))
app.use("/public", express.static('public'));
app.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp' }))
app.use(express.static('uploads'))
var sess = {
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
app.use((req, res, next)=>{
  res.locals.formErrors = req.session?.formErrors
  delete req.session.formErrors;
  res.locals.formBody = req.session?.formBody
  next()
})

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file
app.get("/", (req, res)=>{
   res.render("index");
})
app.get("/dashboard", (req, res)=>{
  res.render("dashboard");
})
app.get("/admin-dashboard", (req, res)=>{
  res.render("admin-dashboard");
})

app.get("/register", voterForm)
app.post("/register", addVoter)
app.get("/add-candidate", candidateForm)
app.post("/add-candidate", addCandidate)
app.get("/add-party", partyForm)
app.post("/add-party", partyValidators, addParty)
app.get("/add-election", electionForm)
app.post("/add-election", addElection)

app.get("/admin-login", (req, res)=>{
  res.render("admin_login");
})
app.get("/profile", (req, res)=>{
  res.render("users-profile");
})
app.get("/vote", (req, res)=>{
  res.render("votingpage");
})
app.get("/candidate", (req, res)=>{
  res.render("candidate");
})
app.get("/party", (req, res)=>{
  res.render("party");
})




app.listen(5000, ()=>{
  console.log('Server is listening on port 5000');
});