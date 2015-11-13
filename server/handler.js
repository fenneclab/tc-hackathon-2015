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

router.put('/pandas/:id', (req, res) => {
  console.log(`pandId: ${req.params.id}`)
  return res.sendStatus(204);
});

export default router;
