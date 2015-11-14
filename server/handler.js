import _ from 'lodash';
import {Router} from 'express';
import Promise from 'bluebird';

import google from './util/google';
import facebook from './util/facebook';
import watoson from './util/watoson';

const router = Router();

// router.get('/analyze', (req, res, next) => {
//   return facebook.getFeed().then(feed => {
//     return feed.data.map(e => {
//       const messages = [];
//       messages.push(e.message);
//       return messages;
//     });
//   }).then(messages => {
//     const filtered = _.flatten(messages).filter(e => !!e);
//     return Promise.map(filtered, google.translate, {concurrency: 10});
//   }).then((translateds) => {
//     console.log('count: ' + translateds.reduce((prev, e) => {
//       return _.words(e).length + prev;
//     }, 0));
//     return watoson.personalityInsights(translateds.join('\n'));
//   }).then(result => {
//     return res.sendStatus(200);
//   }).catch(err => next(err));
// });

router.get('/bears', (req, res) => {
  return res.status(200).json({
    bears: [{
      id: 1,
      name: 'リーリー'
    }, {
      id: 2,
      name: 'シンシン'
    }]
  });
});

router.get('/analyze', (req, res) => {
  return res.status(200).json([{
    id     : 1,
    name   : 'さや',
    age    : 24,
    image  : 'https://s3-ap-northeast-1.amazonaws.com/tc-hackathon-2015-kari/1.jpg',
    matched: 80
  }, {
    id     : 2,
    name   : 'しずか',
    age    : 21,
    image  : 'https://s3-ap-northeast-1.amazonaws.com/tc-hackathon-2015-kari/2.jpg',
    matched: 79
  }, {
    id     : 3,
    name   : 'メロン',
    age    : 20,
    image  : 'https://s3-ap-northeast-1.amazonaws.com/tc-hackathon-2015-kari/3.jpg',
    matched: 76
  }, {
    id     : 4,
    name   : 'みほ',
    age    : 22,
    image  : 'https://s3-ap-northeast-1.amazonaws.com/tc-hackathon-2015-kari/4.jpg',
    matched: 70
  }]);
});

export default router;
