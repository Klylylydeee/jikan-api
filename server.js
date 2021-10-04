const express = require("express");
const cors = require("cors");
const morgan = require('morgan');

require("dotenv").config();

const connectDatabase = require('./Database/connection');
const errorController = require('./Route/notFound');

const app = express();

app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

connectDatabase();

app.listen(process.env.PORT || 5000, () =>
  console.log(`Running at port http://localhost:${process.env.PORT || 5000}/`)
);

app.get("/", async (req,res,next) => {
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
        get_anime_by_stitle: `${process.env.HOME_URL}/title/:title`,
      }
    }
  })
});

app.use('/', require('./Route/route'));
app.use('/jikan-api', require('./Route/path.jikan'));
app.use(errorController.get404);
app.use(errorController.get500);