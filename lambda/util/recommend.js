import _ from 'lodash';
import rq from 'request-promise';

const USERS = {
  'akira': {
    name   : '佐々木 瞳',
    age    : 26,
    address: '港区',
    job    : '保育士',
    image  : 'https://s3-ap-northeast-1.amazonaws.com/tc-hackathon-2015-kari/1.png'
  },
  'ami': {
    name   : '山田 優',
    age    : 24,
    address: '杉並区',
    job    : '会社員',
    image  : 'https://s3-ap-northeast-1.amazonaws.com/tc-hackathon-2015-kari/2.png'
  },
  'ariana': {
    name   : '山崎 愛',
    age    : 26,
    address: '目黒区',
    job    : 'ミュージシャン',
    image  : 'https://s3-ap-northeast-1.amazonaws.com/tc-hackathon-2015-kari/3.png'
  },
  'arison': {
    name   : '時田 みな',
    age    : 22,
    address: '新宿区',
    job    : '学生',
    image  : 'https://s3-ap-northeast-1.amazonaws.com/tc-hackathon-2015-kari/4.png'
  },
  'gomaki': {
    name   : '高田 まみ',
    age    : 27,
    address: '杉並区',
    job    : 'フリーター',
    image  : 'https://s3-ap-northeast-1.amazonaws.com/tc-hackathon-2015-kari/5.png'
  },
  'hirary': {
    name   : '池田 百合',
    age    : 30,
    address: '千代田区',
    job    : 'OL',
    image  : 'https://s3-ap-northeast-1.amazonaws.com/tc-hackathon-2015-kari/6.png'
  },
  'kanako': {
    name   : '篠田 ゆうこ',
    age    : 22,
    address: '横浜',
    job    : '専門学生',
    image  : 'https://s3-ap-northeast-1.amazonaws.com/tc-hackathon-2015-kari/7.png'
  },
  'love': {
    name   : '笠井 枝理依',
    age    : 28,
    address: '新宿区',
    job    : '会社員',
    image  : 'https://s3-ap-northeast-1.amazonaws.com/tc-hackathon-2015-kari/8.png'
  },
  'taylor': {
    name   : '横手 絵里子',
    age    : 27,
    address: '赤羽',
    job    : '事務',
    image  : 'https://s3-ap-northeast-1.amazonaws.com/tc-hackathon-2015-kari/9.png'
  }
};

export default {
  getMatched(persona) {
    const options = {
      url: 'http://52.192.17.71/recommend/v1',
      qs : {
        user: JSON.stringify(persona)
      },
      json: true
    };
    return rq(options)
    .then(({result}) => {
      console.log(result);
      return _.compact(_.sortByOrder(result.map(e => {
        const user = USERS[e.id];
        if (!user) {
          return null;
        }
        user.matched = e.distance;
        return user;
      }), 'matched', 'desc')).slice(0, 4);
    });
  }
};
