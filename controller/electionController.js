const Election = require("../models/Election");

let electionForm = (req, res)=>{
    res.render("add-election");
  }

let addElection = async(req, res)=>{

    try {
        let election = new Election(req.body);
        await election.save()
        res.redirect('/admin-dashboard')
    } catch (error) {
        res.send(error.message)
    }
  }

  module.exports = {electionForm, addElection}