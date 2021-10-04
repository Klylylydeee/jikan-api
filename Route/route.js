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

router.get("/admin", async (req,res,next) => {
    res.status(200).send({
      admin: "Welcome to AniDB API EndPoint List",
      get: {
        jikan: {
          fetch_based_on_titles: `${process.env.HOME_URL}/jikan-api/title/:title`,
          fetch_based_on_id: `${process.env.HOME_URL}/jikan-api/id/:id`
        },
        ani_db: {
          get_anime_complete: `${process.env.HOME_URL}/anime/only`,
          get_anime_count_by_letter: `${process.env.HOME_URL}/anime/only`,
          get_anime_by_genre: `${process.env.HOME_URL}/anime/:genre`,
          get_anime_by_starting_and_ending_date: `${process.env.HOME_URL}/dl/date?start=StartYear-StartMonth-StartDay&end=EndYear-EndMonth-EndDay`,
          get_anime_by_starting_letter: `${process.env.HOME_URL}/letter/:letter`,
          get_anime_by_stitle: `${process.env.HOME_URL}/title/:title`
        }
      },
      post: {
        add_anime_based_from_jikan_api_id: `${process.env.HOME_URL}/add/id/:id`,
        add_custom_whole_data: `${process.env.HOME_URL}/anime/custom`
      },
      patch: {
        update_an_existing_anime_document: `${process.env.HOME_URL}/patch/:title`
      },
      delete: {
        delete_an_existing_anime_document: `${process.env.HOME_URL}/delete/:title`
      }
    })
  });

module.exports = router;