import rq from 'request-promise';
import Promise from 'bluebird';

export default {
  getFeed(fbToken) {
    const options = {
      url: 'https://graph.facebook.com/v2.5/me/feed',
      qs : {
        access_token: fbToken,
        limit       : 1000
      },
      json: true
    };
    return rq(options)
    .then(result => {
      // とりあえずページング可能な場合は2回目データ取得して成功率をあげる
      if (result.paging.next) {
        options.url = result.paging.next;
        return rq(options)
        .then(result2 => {
          return Promise.resolve(result.data.concat(result2.data));
        });
      } else {
        return Promise.resolve(result.data);
      }
    });
  }
};
