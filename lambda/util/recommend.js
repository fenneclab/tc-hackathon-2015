import _ from 'lodash';
import rq from 'request-promise';

const USERS = {
  '1': {
    name : 'さや',
    age  : 24,
    image: 'https://s3-ap-northeast-1.amazonaws.com/tc-hackathon-2015-kari/1.png'
  },
  '2': {
    name : 'しずか',
    age  : 21,
    image: 'https://s3-ap-northeast-1.amazonaws.com/tc-hackathon-2015-kari/2.png'
  },
  '3': {
    name : 'メロン',
    age  : 20,
    image: 'https://s3-ap-northeast-1.amazonaws.com/tc-hackathon-2015-kari/3.png'
  },
  '4': {
    name : 'みほ',
    age  : 22,
    image: 'https://s3-ap-northeast-1.amazonaws.com/tc-hackathon-2015-kari/4.png'
  }
};

export default {
  getMatched(persona) {
    const options = {
      url: 'http://52.192.17.71/recommend/v1',
      qs : {
        user: persona
      },
      json: true
    };
    return rq(options)
    .then(({result}) => {
      console.log(result);
      return _.sortByOrder(result.map(e => {
        const user = USERS[e.id];
        user.matched = e.distance;
      }), 'matched', 'desc');
    });
  }
};
