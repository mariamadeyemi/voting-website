const Vote = require("../models/Vote");
const Party = require("../models/Party");
const Candidate = require("../models/Candidate");

const voteForm = async(req, res)=>{
    let parties = await Party.fetch();
    res.render("votingpage", { parties });
  }

const getCandidate = async(req, res)=>{
   let {id} = req.params
  
   try {
    let candidate = await Candidate.findCandidate(id)
    // console.log(candidate);
    res.render("candidate", {candidate}) 
} catch (error) {
    res.send(error.message)
}
}


module.exports = { voteForm, getCandidate }
