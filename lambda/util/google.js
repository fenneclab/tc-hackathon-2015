import Promise from 'bluebird';
import config from 'config';
import google from 'googleapis';

const gTranslate = google.translate('v2');

export default {
  translate(message) {
    return new Promise((resolve) => {
      if (!message) {
        return resolve('');
      }
      gTranslate.translations.list({
        key   : config.default.google.apiKey,
        q     : message,
        source: 'ja',
        target: 'en'
      }, (err, result) => {
        if (err) {
          console.error(err);
          return resolve('');
        }
        return resolve(result.data.translations[0].translatedText);
      });
    });
  }
};
