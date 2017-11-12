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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
