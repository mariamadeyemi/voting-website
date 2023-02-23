const Voter = require("../models/Voter");
const bcrypt = require ("bcrypt");
const saltRounds = 10;
const Candidate = require("../models/Candidate");
const Party = require("../models/Party");
var randtoken = require('rand-token');
const emailVerify = require('../middlewares/emailVerification');
const connection = require('../models/connection');

let voterLogin = async (req, res) => {
    try {
     let { email, password } = req.body
    let voter = new Voter(req.body)
    let result = await voter.findOne(email);

    if (result && await bcrypt.compare(password, result.password) && result.verify !== "N") {
        req.session.user_id = result.id
        res.redirect('/dashboard')
    }else {
        req.flash('Error', "Invalid username or password")
        res.redirect('back')
    }    
    } catch (error) {
     res.sendStatus(404)
     console.log(error)
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

let viewProfile = async(req, res)=>{
    try {
        if(req.session.user_id){
            let voter = await Voter.fetchById(req.session.user_id);
            res.render("users-profile", { voter });
            
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
        let body = req.body
    
        let voter = new Voter({...body, verify: "N", token:token});
        // let newVoter = new Voter(req.body)
        // let getVoter = await newVoter.findOne(email)
        // console.log(getVoter);
       
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
        await emailVerify(req.body.email_address, token)
        req.flash("Success", "Successfully registered, Verify your email to login")
        res.redirect("/user-login")
            })          

    } catch (error) {
        res.send(error.message)
    }
}

let verify = async(req, res)=>{
    try {
        let token = req.query.token
        let result = await Voter.findToken(token);
        let email = result.email_address
        // console.log(result)

        const [rows] = await connection.execute('UPDATE voters SET `verify` = ? WHERE `email_address` = ?', ['Y', email]);
        // console.log(rows);

res.render("verify-page")
// console.log(req.query);
 

    } catch (error) {
      res.send(error.message)  
    }
    

}



const logout = (req, res) => {
    req.flash('Success', "Bye")
    delete req.session.user_id
    res.redirect('/')
}


module.exports = {voterForm, addVoter, voterLogin, logout, viewDashboard, viewProfile, verify}