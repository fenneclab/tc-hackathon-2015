import _ from 'lodash';
import Promise from 'bluebird';
import google from './util/google';
import facebook from './util/facebook';
import watoson from './util/watoson';
import recommend from './util/recommend';

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
    return watoson.personalityInsights(translateds.join('\n'));
  }).then(persona => {
    return recommend.getMatched(persona);
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
