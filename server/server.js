import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import ApiError from './util/error';
import handler from './handler';

const server = express();

server.set('port', (process.env.PORT || 3000));

server.use(bodyParser.json());

server.use(cors());

server.use(handler);

// error handler
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  function fail(error) {
    return res.status(error.status).send({
      message: error.message
    });
  }
  console.error(err);
  if (err instanceof ApiError) {
    return fail(err);
  }
  return fail(new ApiError('Unknown', 500, err));
});

server.listen(server.get('port'), () => {
  console.log('The server is running at http://localhost:' + server.get('port'));
});
