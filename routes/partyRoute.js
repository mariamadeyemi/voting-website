const { Router } = require('express');
const { partyForm, addParty, getParty, getParties } = require('../controller/partyController');
const adminauth = require('../middlewares/adminauth');
const partyValidators = require('../validators/partyValidator');

const router = Router();

router.get("/add-party", adminauth, partyForm)
router.post("/add-party", partyValidators, addParty)
router.get("/party/:id", getParty)
router.get("/", getParties)


module.exports = router
