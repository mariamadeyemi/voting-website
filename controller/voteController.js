const Vote = require("../models/Vote");
const Party = require("../models/Party");
const Candidate = require("../models/Candidate");
const connection = require('../models/connection');

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

const addVote = async(req, res)=>{
    try {
      let vote = new Vote({
        election_id: 1,
        voter_id: req.session.user_id,
        vote: req.body.vote
      });
      await vote.save()
      res.redirect("/confirmation")
    } catch (error) {
      res.send(error.message)
    }
}

const voteResult = async(req, res)=>{
  try {
    let vote = new Vote()
    let votes = await vote.totalVotes();
        let sql = 'SELECT parties.name, COUNT(votes.id) AS count FROM votes JOIN parties on votes.vote = parties.id GROUP BY vote'
        const [result] = await connection.execute(sql)
    res.render("result", {votes, result})
  } catch (error) {
   res.send(error.message) 
  }
}



// const apiVote = async(req, res)=>{
//   try {
//     let countVote = await Vote.countVotes(req.params.id)
//     res.send(countVote) 
//   } catch (error) {
//     res.json(0)
//   }
  
// }


module.exports = { voteForm, getCandidate, addVote, voteResult }
