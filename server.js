const express = require('express');
const app = express();
const fileUpload = require('express-fileUpload');
const session = require('express-session');
const flash = require('./helpers/req-flash');
const adminRoute = require("./routes/adminRoute");
const candidateRoute = require("./routes/candidateRoute");
const electionRoute = require("./routes/electionRoute");
const partyRoute = require("./routes/partyRoute");
const voteRoute = require("./routes/voteRoute");
const voterRoute = require("./routes/voterRoute");



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


app.use(adminRoute)
app.use(candidateRoute)
app.use(electionRoute)
app.use(partyRoute)
app.use(voteRoute)
app.use(voterRoute)



app.listen(5000, ()=>{
  console.log('Server is listening on port 5000');
});