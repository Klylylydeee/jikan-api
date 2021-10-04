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

app.use('/', require('./Route/route'));
app.use('/jikan-api', require('./Route/path.jikan'));
app.use(errorController.get404);
app.use(errorController.get500);