const Voter = require("../models/Voter");
const bcrypt = require ("bcrypt");
const saltRounds = 10;
const Candidate = require("../models/Candidate");
const Party = require("../models/Party");
var randtoken = require('rand-token');
const emailVerify = require('../middlewares/emailVerification');
const connection = require('../models/connection');

let voterLogin = async (req, res) => {
    let { email, password } = req.body
    let voter = new Voter(req.body)
    let result = await voter.findOne(email);
    
    if (result && await bcrypt.compare(password, result.password)) {
        req.session.user_id = result.id
        res.redirect('/dashboard')
    } else {
        req.flash('Error', "Invalid username or password")
        res.redirect('back')
    }
}

let viewDashboard = async(req, res)=>{
    try {
        if(req.session.user_id){
            let voter = await Voter.fetchById(req.session.user_id);
            let candidates = await Candidate.findCandidates();
            res.render("dashboard", {candidates, voter});
            
        }
        
    } catch (error) {
        res.send(error.message)
    }
    
}

let voterForm = (req, res)=>{
    res.render("register");
}


// async..await is not allowed in global scope, must use a wrapper


// main().catch(console.error);




let addVoter = async(req, res)=>{
    try {
        let token = randtoken.generate(20);
     let voter = new Voter(req.body, {verify: "N", token:token});
        bcrypt.hash(req.body.password, saltRounds, async(err, hash)=>{
            voter.password = hash;
            if (req.files?.photo) {
                let photo = req.files.photo
                if (photo.mimetype.startsWith('image/')) {
                    let ext = `.${photo.name.split('.').pop()}`
                    let fileName = Number(new Date()).toString(36) + Math.floor((Math.random() + 1) * 10 * 6) + ext
                    photo.mv('uploads/' + fileName, async (err) => {
                        if (!err)
                        voter.photo = fileName
                        else
                        voter.photo = null
                        await voter.save();
                        req.session.verify_id = req.body.email_address;
                    })
                }

            } else {
                await voter.save()
            }
            })
            await emailVerify(req.body.email_address, token)
        req.flash("Success", "Successfully registered, Verify your email to login")
        res.redirect("/user-login") ///verify_email?email=${req.session.verify_id}
    } catch (error) {
        res.send(error.message)
    }
}

let verify = async(req, res)=>{
    try {
        let voter = new Voter();
        let result = await voter.findToken(req.query.token);
        let verify = result.verify
if(result){
  result.setProp(verify="Y")
}

await result.update();
 
res.render("verify-page"); 

    } catch (error) {
      res.send(error.message)  
    }
    

}



const logout = (req, res) => {
    req.flash('Success', "Bye")
    delete req.session.user_id
    res.redirect('/')
}


module.exports = {voterForm, addVoter, voterLogin, logout, viewDashboard, verify}