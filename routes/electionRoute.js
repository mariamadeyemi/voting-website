const { Router } = require('express');
const { electionForm, addElection } = require('../controller/electionController');

const router = Router();

router.get("/add-election", electionForm)
router.post("/add-election", addElection)

module.exports = router