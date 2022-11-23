const Voter = require("../models/Voter");

let voterForm = (req, res)=>{
    res.render("register");
  }

let addVoter = async(req, res)=>{
    try {
      let voter = new Voter(req.body);
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
      res.redirect('/dashboard')
  } catch (error) {
      res.send(error.message)
  }
  }

  module.exports = {voterForm, addVoter}