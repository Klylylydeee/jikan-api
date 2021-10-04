const axios = require("axios");
let { Anime } = require('../Model/schema.anime');
let { Animes } = require('../Model/schema.animes');

exports.getAnimeDocumentDownloadEpisodes = async (req, res, next) => {
    try {
        let numberEpisodes = 0;
        let numberDownloadEpisodes = 0;
        let fetchAnimeResult = await Anime.find()
        .select('title type episodes premiered genre score download_data._id download_data.memory_size download_data.episodes_downloaded download_data.type_downloaded download_data.quality_downloaded download_data.date_downloaded');
        // Get total downloaded anime length
        fetchAnimeResult.map((currAnime) => {
            return numberEpisodes += currAnime.episodes
        })
        // Get total downloaded anime episodes downloaded
        fetchAnimeResult.map((currAnime) => {
            return numberDownloadEpisodes += currAnime.download_data.episodes_downloaded
        })
        // Split into multiple arrays based on first character/letter
        const obj = fetchAnimeResult.reduce((accumulator, currentData) => {
            const letter = currentData.title[0];
            accumulator[letter] = (accumulator[letter] || []).concat(currentData);
            return accumulator;
        }, {})
        // Sets the Object containing the Character and Anime based from the split data
        let processedData = Object.entries(obj).map(([character, anime]) => {
            let length = anime.length;
            return { character, length, anime }
        }).sort((a, b) => a.character > b.character);
        res.json({
            message: `There are ${numberEpisodes} episodes`,
            downloaded: `You have downloaded ${numberDownloadEpisodes} episodes`,
            total_anime: fetchAnimeResult.length,
            payload: processedData
        })
    } catch (err) {
        const error = new Error(err.message);
        error.statusCode = err.status || 401;
        return next(error)
    }
}

exports.getAnimeDocumentPerCharacter = async (req, res, next) => {
    try {
        let numberEpisodes = 0;
        let numberDownloadEpisodes = 0;
        let fetchAnimeResult = await Anime.find()
        .select('title type episodes premiered genre score download_data._id download_data.memory_size download_data.episodes_downloaded download_data.type_downloaded download_data.quality_downloaded download_data.date_downloaded');
        // Get total downloaded anime length
        fetchAnimeResult.map((currAnime) => {
            return numberEpisodes += currAnime.episodes
        })
        // Get total downloaded anime episodes downloaded
        fetchAnimeResult.map((currAnime) => {
            return numberDownloadEpisodes += currAnime.download_data.episodes_downloaded
        })
        // Split into multiple arrays based on first character/letter
        const obj = fetchAnimeResult.reduce((accumulator, currentData) => {
            const letter = currentData.title[0];
            accumulator[letter] = (accumulator[letter] || []).concat(currentData);
            return accumulator;
        }, {})
        // Sets the Object containing the Character and Anime based from the split data
        let processedData = Object.entries(obj).map(([character, anime]) => {
            let length = anime.length;
            return { character, length }
        }).sort((a, b) => a.character > b.character);
        res.json({
            message: `There are ${numberEpisodes} episodes`,
            downloaded: `You have downloaded ${numberDownloadEpisodes} episodes`,
            total_anime: fetchAnimeResult.length,
            payload: processedData
        })
    } catch (err) {
        const error = new Error(err.message);
        error.statusCode = err.status || 401;
        return next(error)
    }
}

exports.getSearchTitleAnimeDocument = async (req, res, next) => {
    try {
    const users = await Anime.fuzzySearch({ query: `${req.params.title}`, prefixOnly: true, minSize: 4 })
    .select('title episodes download_data.memory_size download_data.episodes_downloaded download_data.type_downloaded download_data.quality_downloaded download_data.date_downloaded download_data.notes')
    .limit(30)
    // const cursor = Anime.find().cursor();
    // cursor.next(function (error, doc) {
    // const obj = fetchAnimeResult.reduce((acc, attr) => ({ ...acc, [attr]: doc[attr] }), {});
    //     return Anime.findByIdAndUpdate(doc._id, obj);
    // });;
    // const cursor = Anime.find({ title: '07-Ghost' }).limit(1).cursor();
    // cursor.next(async function (error, doc) {
    //     const obj = fetchAnimeResult.reduce((acc, title) => ({ ...acc, [title]: doc[title] }), {});
    //     return await Anime.findByIdAndUpdate(doc._id, obj);
    // });

        
    // const regexGenreParams = new RegExp(`^${req.params.title}`, 'i')
    // let fetchAnimeResult = await Anime.find({ title: { $regex: regexGenreParams } })
    //     for(let x = 0; x < fetchAnimeResult.length; x++){
    //         if(fetchAnimeResult[x].related){
    //             const animeMapData = new Animes({
    //                 title: fetchAnimeResult[x].title,
    //                 title_english: fetchAnimeResult[x].title_english,
    //                 title_japanese: fetchAnimeResult[x].title_japanese,
    //                 image_url: fetchAnimeResult[x].image_url,
    //                 trailer_url: fetchAnimeResult[x].trailer_url,
    //                 type: fetchAnimeResult[x].type,
    //                 episodes: fetchAnimeResult[x].episodes,
    //                 status: fetchAnimeResult[x].status,
    //                 duration: fetchAnimeResult[x].duration,
    //                 score: fetchAnimeResult[x].score,
    //                 synopsis: fetchAnimeResult[x].synposis,
    //                 background: fetchAnimeResult[x].background,
    //                 premiered: fetchAnimeResult[x].premiered,
    //                 genre: fetchAnimeResult[x].genres,
    //                 download_data: {
    //                     memory_size: fetchAnimeResult[x].download_data.memory_size,
    //                     episodes_downloaded: fetchAnimeResult[x].download_data.episodes_downloaded,
    //                     type_downloaded: fetchAnimeResult[x].download_data.type_downloaded,
    //                     quality_downloaded: fetchAnimeResult[x].download_data.quality_downloaded,
    //                     date_downloaded: fetchAnimeResult[x].download_data.date_downloaded,
    //                     notes: fetchAnimeResult[x].download_data.notes
    //                 },
    //                 related: {
    //                     adaptation: fetchAnimeResult[x].related.adaptation,
    //                     alternative_version: fetchAnimeResult[x].related.alternative_version,
    //                     alternative_setting: fetchAnimeResult[x].related.alternative_setting,
    //                     character: fetchAnimeResult[x].related.character,
    //                     other: fetchAnimeResult[x].related.other,
    //                     prequel: fetchAnimeResult[x].related.prequel,
    //                     sequel: fetchAnimeResult[x].related.sequel,
    //                     side_story: fetchAnimeResult[x].related.side_story,
    //                     spin_off: fetchAnimeResult[x].related.spin_off,
    //                     summary: fetchAnimeResult[x].related.summary,
    //                 },
    //                 characters: fetchAnimeResult[x].characters
    //             })
    //             const result = await animeMapData.save()
    //         } else {
    //             const animeMapData = new Animes({
    //                 title: fetchAnimeResult[x].title,
    //                 title_english: fetchAnimeResult[x].title_english,
    //                 title_japanese: fetchAnimeResult[x].title_japanese,
    //                 image_url: fetchAnimeResult[x].image_url,
    //                 trailer_url: fetchAnimeResult[x].trailer_url,
    //                 type: fetchAnimeResult[x].type,
    //                 episodes: fetchAnimeResult[x].episodes,
    //                 status: fetchAnimeResult[x].status,
    //                 duration: fetchAnimeResult[x].duration,
    //                 score: fetchAnimeResult[x].score,
    //                 synopsis: fetchAnimeResult[x].synposis,
    //                 background: fetchAnimeResult[x].background,
    //                 premiered: fetchAnimeResult[x].premiered,
    //                 genre: fetchAnimeResult[x].genres,
    //                 download_data: {
    //                     memory_size: fetchAnimeResult[x].download_data.memory_size,
    //                     episodes_downloaded: fetchAnimeResult[x].download_data.episodes_downloaded,
    //                     type_downloaded: fetchAnimeResult[x].download_data.type_downloaded,
    //                     quality_downloaded: fetchAnimeResult[x].download_data.quality_downloaded,
    //                     date_downloaded: fetchAnimeResult[x].download_data.date_downloaded,
    //                     notes: fetchAnimeResult[x].download_data.notes
    //                 }
    //             })
    //             const result = await animeMapData.save()
    //         }
    //     }
        res.json({
            message: `Sucessful!`,
            payload: users
            // length: fetchAnimeResult.length,
        })
    } catch (err) {
        const error = new Error(err.message);
        error.statusCode = err.status || 401;
        return next(error)
    }
}

exports.getAnimeDocumentByGenre = async (req, res, next) => {
    try {
        const regexGenreParams = new RegExp(req.params.genre, 'i') // i = case insensitive
        let fetchAnimeResult = await Anime.find({ genre: { $regex: regexGenreParams } })
        .select('title type episodes premiered genre score download_data._id download_data.memory_size download_data.episodes_downloaded download_data.type_downloaded download_data.quality_downloaded download_data.date_downloaded')
        .sort({ score: 'descending' })
        res.json({
            message: `Sucessful!`,
            length: fetchAnimeResult.length,
            payload: fetchAnimeResult
        })
    } catch (err) {
        const error = new Error(err.message);
        error.statusCode = err.status || 401;
        return next(error)
    }
}

exports.getAnimeDocumentByFirstLetter = async (req, res, next) => {
    try {
        const regexGenreParams = new RegExp(`^${req.params.letter}`, 'i')
        console.log(regexGenreParams)
        let fetchAnimeResult = await Anime.find({ title: { $regex: regexGenreParams } })
        .select('title ')
        .sort({ title: 'ascending' })
        res.json({
            message: `Sucessful!`,
            length: fetchAnimeResult.length,
            payload: fetchAnimeResult
        })
    } catch (err) {
        const error = new Error(err.message);
        error.statusCode = err.status || 401;
        return next(error)
    }
}

exports.deleteAnimeByTitle = async (req, res, next) => {
    try {
        const regexTitleParams = new RegExp(req.params.title, 'i') // i = case insensitive
        let fetchAnimeResult = await Anime.deleteOne({ title: { $regex: regexTitleParams } });
        res.json({
            message: `Sucessful!`,
            length: fetchAnimeResult.length,
            payload: fetchAnimeResult
        })
    } catch (err) {
        const error = new Error(err.message);
        error.statusCode = err.status || 401;
        return next(error)
    }
}

exports.patchAnimeByTitle = async (req, res, next) => {
    try {
        const regexTitleParams = new RegExp(req.params.title, 'i') // i = case insensitive
        let fetchAnimeResult = await Anime.updateOne({ title: { $regex: regexTitleParams } }, {
            $set: {
                download_data: {
                    memory_size: req.body.memory_size,
                    episodes_downloaded: req.body.episodes_downloaded,
                    type_downloaded: req.body.type_downloaded,
                    quality_downloaded: req.body.quality_downloaded,
                    date_downloaded: req.body.date_downloaded,
                    notes: req.body.notes
                }
            },
            $inc: {
                __v: 1
            }
        });
        res.json({
            message: `Sucessful!`,
            length: fetchAnimeResult.length,
            payload: fetchAnimeResult
        })
    } catch (err) {
        const error = new Error(err.message);
        error.statusCode = err.status || 401;
        return next(error)
    }
}

exports.postAnimeDocument = async (req, res, next) => {
    try {
        let fetchAnimeIdResult = await axios.get(`${process.env.HOME_URL}/jikan-api/id/${req.params.id}`,
        { timeout: 15000 } );
        const animeMapData = new Anime({
            title: fetchAnimeIdResult.data.payload.title,
            title_english: fetchAnimeIdResult.data.payload.title_english,
            title_japanese: fetchAnimeIdResult.data.payload.title_japanese,
            image_url: fetchAnimeIdResult.data.payload.image_url,
            trailer_url: fetchAnimeIdResult.data.payload.trailer_url,
            type: fetchAnimeIdResult.data.payload.type,
            episodes: fetchAnimeIdResult.data.payload.episodes,
            status: fetchAnimeIdResult.data.payload.status,
            duration: fetchAnimeIdResult.data.payload.duration,
            score: fetchAnimeIdResult.data.payload.score,
            synopsis: fetchAnimeIdResult.data.payload.synposis,
            background: fetchAnimeIdResult.data.payload.background,
            premiered: fetchAnimeIdResult.data.payload.premiered,
            genre: fetchAnimeIdResult.data.payload.genres,
            download_data: {
                memory_size: req.body.memory_size,
                episodes_downloaded: req.body.episodes_downloaded,
                type_downloaded: req.body.type_downloaded,
                quality_downloaded: req.body.quality_downloaded,
                date_downloaded: req.body.date_downloaded,
                notes: req.body.notes
            },
            related: {
                adaptation: fetchAnimeIdResult.data.payload.related[`Adaptation`],
                alternative_version: fetchAnimeIdResult.data.payload.related[`Alternative version`],
                alternative_setting: fetchAnimeIdResult.data.payload.related[`Alternative setting`],
                character: fetchAnimeIdResult.data.payload.related[`Character`],
                other: fetchAnimeIdResult.data.payload.related[`Other`],
                prequel: fetchAnimeIdResult.data.payload.related[`Prequel`],
                sequel: fetchAnimeIdResult.data.payload.related[`Sequel`],
                side_story: fetchAnimeIdResult.data.payload.related[`Side story`],
                spin_off: fetchAnimeIdResult.data.payload.related[`Spin-off`],
                summary: fetchAnimeIdResult.data.payload.related[`Summary`],
            },
            characters: fetchAnimeIdResult.data.payload.characters
        })
        const result = await animeMapData.save()
        res.status(200).json({
            message: `Sucessful!`,
            payload: result
        })
    } catch (err) {
        const error = new Error(err.message);
        error.statusCode = err.status || 401;
        return next(error)
    }
}

exports.postAnimeCustomDocument = async (req, res, next) => {
    try {
        const animeMapData = new Anime({
            title: req.body.title,
            title_english: req.body.title_english,
            title_japanese: req.body.title_japanese,
            image_url: req.body.image_url,
            trailer_url: req.body.trailer_url,
            type: req.body.type,
            episodes: req.body.episodes,
            status: req.body.status,
            duration: req.body.duration,
            score: req.body.score,
            synopsis: req.body.synopsis,
            background: req.body.background,
            premiered: req.body.premiered,
            genre: req.body.genre,
            download_data: {
                memory_size: req.body.download_data.memory_size,
                episodes_downloaded: req.body.download_data.episodes_downloaded,
                type_downloaded: req.body.download_data.type_downloaded,
                quality_downloaded: req.body.download_data.quality_downloaded,
                date_downloaded: req.body.download_data.date_downloaded,
                notes: req.body.download_data.notes
            }
        })
        const result = await animeMapData.save()
        console.log(result)
        res.status(200).json({
            message: `Sucessful!`,
            payload: result
        })
    } catch (err) {
        console.log(err)
        const error = new Error(err.message);
        error.statusCode = err.status || 401;
        return next(error)
    }
}

exports.getAnimesByTwoDate = async (req, res, next) => {
    try {
        let fetchAnimeResult = await Anime.find({ "download_data.date_downloaded": { $gte: new Date(req.query.start), $lt: new Date(req.query.end) }})
        .select('title ')
        .sort({ title: 'ascending' })
        // let fetchAnimeResult = await Anime.find({ "download_data.date_downloaded": new Date('2021-08-28'), "__v": { $lt: 2 } })
        // .select('title') 
        // .sort({ title: 'ascending' })
        let length = Object.values(fetchAnimeResult).length
        res.json({
            message: `Sucessful!`,
            length: length,
            payload: fetchAnimeResult
        });
    } catch (err) {
        const error = new Error(err.message);
        error.statusCode = err.status || 401;
        return next(error)
    }
}
