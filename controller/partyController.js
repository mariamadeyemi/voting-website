const Party = require("../models/Party");

let partyForm = (req, res)=>{
    res.render("add-party");
  }

let addParty = async(req, res)=>{
    try {
      let party = new Party(req.body);
      if (req.files?.logo) {
          let logo = req.files.logo
          if (logo.mimetype.startsWith('image/')) {
              let ext = `.${logo.name.split('.').pop()}`
              let fileName = Number(new Date()).toString(36) + Math.floor((Math.random() + 1) * 10 * 6) + ext
              logo.mv('uploads/' + fileName, async (err) => {
                  if (!err)
                      party.logo = fileName
                  else
                      party.logo = null
                  await party.save()
              })
          }
      } else {
          await party.save()
      }
      res.redirect('/admin-dashboard')
  } catch (error) {
      res.send(error.message)
  }
  }  

  let getParties = async (req, res) => {
    try {
        let parties = await Party.fetch()
        res.render('index', { parties })
    } catch (error) {
        res.send(error.message)
    }
}

let getParty = async (req, res) => {
    let { id } = req.params
    try {
        let party = await Party.fetchById(id)
          res.render("party", {party})
    } catch (error) {
        res.send(error.message)
    }

}

module.exports = { partyForm, addParty, getParties, getParty }
