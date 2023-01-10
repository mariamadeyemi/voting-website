const { Router } = require('express');
const { voteForm, addVote, getCandidate, voteResult } = require('../controller/voteController');
const authenticate = require('../middlewares/authenticate');



const router = Router();

router.get("/vote", authenticate, voteForm)
router.post("/vote", addVote)
router.get("/confirmation", (req, res)=>{
    res.render("confirmation");
  })
router.get("/candidate/:id", getCandidate)
router.get("/result", voteResult)

module.exports = router
