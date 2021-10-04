const express = require('express');
const router = express.Router();
const jikanController = require('../Controller/controller.jikan');

router.get("/title/:title", jikanController.getJikanAnimeSearch)

router.get("/id/:id", jikanController.getJikanAnimeById);

module.exports = router;