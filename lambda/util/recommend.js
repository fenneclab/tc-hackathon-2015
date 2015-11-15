import _ from 'lodash';
import rq from 'request-promise';

const USERS = {
  'akira': {
    id     : 1,
    name   : '佐々木 瞳',
    age    : 26,
    address: '港区',
    job    : '保育士',
    image  : 'https://s3-ap-northeast-1.amazonaws.com/tc-hackathon-2015-kari/1.png',
    type   : '大胆',
    AIType : ['大胆で誠実', '本当はもっと甘えてみたい']
  },
  'ami': {
    id     : 2,
    name   : '山田 優',
    age    : 24,
    address: '杉並区',
    job    : '会社員',
    image  : 'https://s3-ap-northeast-1.amazonaws.com/tc-hackathon-2015-kari/2.png',
    type   : '挑戦好き',
    AIType : ['挑戦好きで大胆', '本当はもっと冒険してみたい']
  },
  'ariana': {
    id     : 3,
    name   : '山崎 愛',
    age    : 26,
    address: '目黒区',
    job    : 'ミュージシャン',
    image  : 'https://s3-ap-northeast-1.amazonaws.com/tc-hackathon-2015-kari/3.png',
    type   : '向上心がある',
    AIType : ['向上心があり創造的', '本当はもっと思いのままに生きてみたい']
  },
  'arison': {
    id     : 4,
    name   : '時田 みな',
    age    : 22,
    address: '新宿区',
    job    : '学生',
    image  : 'https://s3-ap-northeast-1.amazonaws.com/tc-hackathon-2015-kari/4.png',
    type   : '聞き上手',
    AIType : ['聞き上手で活動的', '本当はもっと堅実に生きていきたい']
  },
  'gomaki': {
    id     : 5,
    name   : '高田 まみ',
    age    : 27,
    address: '杉並区',
    job    : 'フリーター',
    image  : 'https://s3-ap-northeast-1.amazonaws.com/tc-hackathon-2015-kari/5.png',
    type   : '外交的',
    AIType : ['外交的で協調性がある', '本当はもっと自分を表現してみたい']
  },
  'hirary': {
    id     : 6,
    name   : '池田 百合',
    age    : 30,
    address: '千代田区',
    job    : 'OL',
    image  : 'https://s3-ap-northeast-1.amazonaws.com/tc-hackathon-2015-kari/6.png',
    type   : '聞き上手',
    AIType : ['聞き上手で独立心がある', '本当はもっと冒険してみたい']
  },
  'kanako': {
    id     : 7,
    name   : '篠田 ゆうこ',
    age    : 22,
    address: '横浜',
    job    : '専門学生',
    image  : 'https://s3-ap-northeast-1.amazonaws.com/tc-hackathon-2015-kari/7.png',
    type   : '信念のある',
    AIType : ['信念があり、きちんとしたことが好き', '本当はもっと堅実に生きていきたい']
  },
  'love': {
    id     : 8,
    name   : '笠井 枝理依',
    age    : 28,
    address: '新宿区',
    job    : '会社員',
    image  : 'https://s3-ap-northeast-1.amazonaws.com/tc-hackathon-2015-kari/8.png',
    type   : '聞き上手',
    AIType : ['聞き上手で照れ屋', '本当はもっと人とつながりたい']
  },
  'taylor': {
    id     : 9,
    name   : '横手 絵里子',
    age    : 27,
    address: '赤羽',
    job    : '事務',
    image  : 'https://s3-ap-northeast-1.amazonaws.com/tc-hackathon-2015-kari/9.png',
    type   : '聞き上手',
    AIType : ['聞き上手で知性的', '本当はもっと堅実に生きていきたい']
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
