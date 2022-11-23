const Candidate = require("../models/Candidate");
const Party = require("../models/Party");
const Election = require("../models/Election");


let candidateForm = async(req, res)=>{
    let parties = await Party.fetch();
    let elections = await Election.fetch();
    res.render("add-candidate", { parties, elections });
  }

let addCandidate = async(req, res)=>{
    try {
        let candidate = new Candidate(req.body);
        // let electionId = await candidate.getElectionId();
        // let partyId = await candidate.getPartyId();
      if (req.files?.photo) {
          let photo = req.files.photo
          if (photo.mimetype.startsWith('image/')) {
              let ext = `.${photo.name.split('.').pop()}`
              let fileName = Number(new Date()).toString(36) + Math.floor((Math.random() + 1) * 10 * 6) + ext
              photo.mv('uploads/' + fileName, async (err) => {
                  if (!err)
                      candidate.photo = fileName
                  else
                      candidate.photo = null
                  await candidate.save()
              })
          }
      } else {
          await candidate.save()
      }
      res.redirect('/admin-dashboard')
  } catch (error) {
      res.send(error.message)
  }
  }  

module.exports = { candidateForm, addCandidate }
