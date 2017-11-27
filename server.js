import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import superagent from 'superagent';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.load();
}

/* MONGO */
const mongoURI = process.env.MONGO_URL;
mongoose.connect(mongoURI);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  // we're connected!
  console.log('connected');
});

mongoose.Promise = global.Promise;

const gameSchema = mongoose.Schema({
  setID: String,
  number: Number,
  player1: String,
  player1Character: String,
  player2: String,
  player2Character: String,
  winner: String,
  loser: String,
  stage: String,
});
const Game = mongoose.model('Game', gameSchema);

const setSchema = mongoose.Schema({
  id: String,
  roundText: String,
  player1: String,
  player1ID: String,
  player2: String,
  player2ID: String,
  winner: String,
  winnerID: String,
  loser: String,
  loserID: String,
});
const Set = mongoose.model('Set', setSchema);
/* END MONGO */

const app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(cookieParser());
app.use(cors());

app.get('/', (req, res) => {
  const { url } = req.query;

  function onPageLoad(err, response) {
    if (err || !response.text) {
      return res.status(500).send(err || 'no response text');
    }

    return res.send(response.text);
  }

  superagent
    .get(url)
    .query()
    .end(onPageLoad);
});

app.listen(process.env.PORT || 3001, function() {
  console.log(`Example app listening on port ${process.env.PORT || 3001}!`);
});
