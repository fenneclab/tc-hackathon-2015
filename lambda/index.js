import _ from 'lodash';
import Promise from 'bluebird';
import google from './util/google';
import facebook from './util/facebook';
// import watoson from './util/watoson';

function analyze(fbToken) {
  return facebook.getFeed(fbToken).then(feed => {
    return feed.map(e => {
      const messages = [];
      messages.push(e.message);
      return messages;
    });
  }).then(messages => {
    const filtered = _.flatten(messages).filter(e => !!e);
    return Promise.map(filtered, google.translate);
  }).then((translateds) => {
    console.log('words count: ' + translateds.reduce((prev, e) => {
      return _.words(e).length + prev;
    }, 0));
    // return watoson.personalityInsights(translateds.join('\n'));
    // dummy response
    return [{
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
    }];
  });
}

function handler(event, context) {
  const fbToken = event.fbToken;
  if (!fbToken) {
    console.log('no fbToken parameter');
    return context.done();
  }
  return analyze(fbToken).then(result => {
    return context.succeed(result);
  })
  .catch(err => {
    return context.fail(err);
  });
}

export {handler};
