'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (process.env.NODE_ENV !== 'production') {
  _dotenv2.default.load();
}

/* MONGO */
var mongoURI = process.env.MONGO_URL;
_mongoose2.default.connect(mongoURI);
var db = _mongoose2.default.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
  console.log('connected');
});

_mongoose2.default.Promise = global.Promise;

var gameSchema = _mongoose2.default.Schema({
  setID: String,
  number: Number,
  player1: String,
  player1Character: String,
  player2: String,
  player2Character: String,
  winner: String,
  loser: String,
  stage: String
});
var Game = _mongoose2.default.model('Game', gameSchema);

var setSchema = _mongoose2.default.Schema({
  id: String,
  roundText: String,
  player1: String,
  player1ID: String,
  player2: String,
  player2ID: String,
  winner: String,
  winnerID: String,
  loser: String,
  loserID: String
});
var Set = _mongoose2.default.model('Set', setSchema);
/* END MONGO */

var app = (0, _express2.default)();
app.use(_bodyParser2.default.json()); // for parsing application/json
app.use((0, _cookieParser2.default)());
app.use((0, _cors2.default)());

app.get('/', function (req, res) {
  var url = req.query.url;


  function onPageLoad(err, response) {
    if (err || !response.text) {
      return res.status(500).send(err || 'no response text');
    }

    return res.send(response.text);
  }

  _superagent2.default.get(url).query().end(onPageLoad);
});

app.listen(process.env.PORT || 3001, function () {
  console.log('Example app listening on port ' + (process.env.PORT || 3001) + '!');
});
