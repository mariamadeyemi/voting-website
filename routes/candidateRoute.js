const { Router } = require('express');
const { candidateForm, addCandidate } = require('../controller/candidateController');
const adminauth = require('../middlewares/adminauth');

const router = Router();

router.get("/add-candidate", adminauth, candidateForm)
router.post("/add-candidate", addCandidate)
router.get("/candidate", (req, res)=>{
    res.render("candidate");
  })

module.exports = router