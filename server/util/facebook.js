import Promise from 'bluebird';

import mockFeed from '../mock/facebook_feed';

export default {
  getFeed() {
    return new Promise((resolve) => {
      return resolve(mockFeed);
    });
  }
};
