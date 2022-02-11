const router = require("express").Router();
const axios = require("axios");

router.get("/", (req, res, next) => {
  axios.get(process.env.API_URL + "/characters")
    .then( apiResponse => {
      res.render("characters/characters-list", {characters: apiResponse.data});
    })
    .catch(err => {
      console.log('Error getting characters from API...', err);
    });
});


router.get("/create", (req, res, next) => {
  res.render("characters/character-create");
});


router.post('/create', (req, res, next) => {

  const characterDetails = {
    name: req.body.name,
    occupation: req.body.occupation,
    weapon: req.body.weapon,
  }

  axios.post(process.env.API_URL + "/characters", characterDetails)
    .then( (response) => {
      res.redirect("/characters");
    })
    .catch( err => {
      console.log('Error creating new character...', err);
    })
})


router.get("/:characterId", (req, res, next) => {
  axios.get(process.env.API_URL + "/characters/" + req.params.characterId)
    .then( apiResponse => {
      res.render("characters/character-details", apiResponse.data);
    })
    .catch();
});


router.get("/:characterId/edit", (req, res, next) => {
  axios.get(process.env.API_URL + "/characters/" + req.params.characterId)
    .then( (response) => {
      res.render("characters/character-edit", response.data);
    })
    .catch( err => {
      console.log("Error getting character details from API...", err);
    });
});

router.post("/:characterId/edit", (req, res, next) => {
  const characterId = req.params.characterId;

  const newDetails = {
    name: req.body.name,
    occupation: req.body.occupation,
    weapon: req.body.weapon,
  };

  axios.put(process.env.API_URL + "/characters/"+req.params.characterId, newDetails)
    .then( (response) => {
      res.redirect(`/characters/${characterId}`);
    })
    .catch( err => {
      console.log("Error updating character...", err);
    });
});


router.post("/:characterId/delete", (req, res, next) => {
  axios.delete(process.env.API_URL + "/characters/" + req.params.characterId)
    .then(() => {
      res.redirect("/characters");
    })
    .catch(err => {
      console.log("Error deleting character...", err);
    });

});

module.exports = router;
