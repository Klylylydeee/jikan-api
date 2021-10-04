const express = require('express');
const router = express.Router();
const animeCollectionController = require('../Controller/controller.anime');

router.get('/anime', animeCollectionController.getAnimeDocumentDownloadEpisodes);

router.get('/anime/only', animeCollectionController.getAnimeDocumentPerCharacter);

router.post('/anime/custom', animeCollectionController.postAnimeCustomDocument);

router.get('/anime/:genre', animeCollectionController.getAnimeDocumentByGenre);

router.get('/dl/date', animeCollectionController.getAnimesByTwoDate);

router.get('/letter/:letter', animeCollectionController.getAnimeDocumentByFirstLetter);

router.get('/title/:title', animeCollectionController.getSearchTitleAnimeDocument);

router.delete('/delete/:title', animeCollectionController.deleteAnimeByTitle);

router.patch('/patch/:title', animeCollectionController.patchAnimeByTitle);

router.post('/add/id/:id', animeCollectionController.postAnimeDocument);

module.exports = router;