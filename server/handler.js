import {Router} from 'express';

const router = Router();

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
