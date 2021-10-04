const axios = require("axios");

exports.getJikanAnimeSearch = async (req, res, next) => {
    try {
        await axios
        .get(`${process.env.BASE_URL}/search/anime?q=${req.params.title}&sort=descending&order_by=title`,
        { timeout: 15000 } )
        .then((searchResult) => {
            filteredDataResult = [];
            searchResult.data.results.map((currAnime) => {
              return filteredDataResult.push({
                mal_id: currAnime.mal_id,
                image_url: currAnime.image_url,
                title: currAnime.title,
                synopsis: currAnime.synopsis,
                type: currAnime.type,
                episodes: currAnime.episodes,
                score: currAnime.score,
                start_date: currAnime.start_date,
                end_date: currAnime.end_date,
              });
            });
            res.json({
              message: `Sucessful!`,
              payload: filteredDataResult,
            });
        })
    } catch (err) {
        const error = new Error(err.message);
        error.statusCode = err.status || 401;
        return next(error)
    }
}

exports.getJikanAnimeById = async (req, res, next) => {
    try {
        let searchResult = await axios.get(`${process.env.BASE_URL}/anime/${req.params.id}`);
        let characterStaffResult = await axios.get(`${process.env.BASE_URL}/anime/${req.params.id}/characters_staff`);
        let characterData = [];
        // Filter Character's Voice Actor with only Japanese Language
        characterStaffResult.data.characters.map((currStaff) => {
            let japaneseVAPriority;
            if (currStaff.voice_actors.some((data) => data.language === `Japanese`)) {
                japaneseVAPriority = currStaff.voice_actors.map(function (e) {
                    return e.language;
                }).indexOf("Japanese");
            }
            if (currStaff.voice_actors.length !== 0) {
                return characterData.push({
                    name: currStaff.name,
                    image_url: currStaff.image_url,
                    role: currStaff.role,
                    voice_actor: japaneseVAPriority === undefined ? {
                        name: currStaff.voice_actors[0].name,
                        voice_actor_img: currStaff.voice_actors[0].image_url,
                        language: currStaff.voice_actors[0].language,
                    } : {
                        name: currStaff.voice_actors[japaneseVAPriority].name,
                        voice_actor_img: currStaff.voice_actors[japaneseVAPriority].image_url,
                        language: currStaff.voice_actors[japaneseVAPriority].language,
                    },
                    name: currStaff.name,
                });
            }
        });
        // Convert Genre Array of Objects into concattinated string
        let filteredGenreData = [];
        searchResult.data.genres.map((currGenre) => {
            return filteredGenreData.push(`${currGenre.name}`)
        })
        res.json({
            message: `Sucessful!`,
            payload: {
                mal_id: searchResult.data.mal_id,
                image_url: searchResult.data.image_url,
                trailer_url: searchResult.data.trailer_url,
                title: searchResult.data.title,
                title_english: searchResult.data.title_english,
                title_japanese: searchResult.data.title_japanese,
                type: searchResult.data.type,
                episodes: searchResult.data.episodes,
                status: searchResult.data.status,
                duration: searchResult.data.duration,
                rating: searchResult.data.rating,
                score: searchResult.data.score,
                synopsis: searchResult.data.synopsis,
                background: searchResult.data.background,
                premiered: searchResult.data.premiered,
                related: searchResult.data.related,
                genres: filteredGenreData.join(', '),
                characters: characterData
            }
        });
    } catch (err) {
        const error = new Error(err.message);
        error.statusCode = err.status || 401;
        return next(error)
    }
}