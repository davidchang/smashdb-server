import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import superagent from 'superagent';

const app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(cookieParser());
app.use(cors());

app.get('/', (req, res) => {
  const { url } = req.query;

  console.log(url);

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
