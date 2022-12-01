const Voter = require("../models/Voter");
const bcrypt = require ("bcrypt");
const saltRounds = 10;
const Vote = require("../models/Vote");
const Candidate = require("../models/Candidate");

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

let addVoter = async(req, res)=>{
    try {
      let voter = new Voter(req.body);
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
                        await voter.save()
                    })
                }
            } else {
                await voter.save()
            }
            
            // if(!err){
            //     await voter.save(); 
            // }else{
            //     console.log(err);
            // }
})
      res.redirect('/dashboard')
  } catch (error) {
      res.send(error.message)
  }
  }



const logout = (req, res) => {
    req.flash('Success', "Bye")
    delete req.session.user_id
    res.redirect('/')
}

module.exports = {voterForm, addVoter, voterLogin, logout, viewDashboard}