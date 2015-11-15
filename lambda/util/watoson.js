import watson from 'watson-developer-cloud';
import Promise from 'bluebird';
import config from 'config';
import _ from 'lodash';
import dummy from './dummy';

const personalityInsightsApi = watson.personality_insights(config.ibm.personalityInsights.credentials);

/**
 * @return {{
 *   "Big 5": {
 *     "Agreeableness": {
 *       "percentage": number,
 *       "details": {
 *         "Openness": {
 *           "percentage": number
 *         },
 *         "Conscientiousness": {
 *           "percentage": number
 *         },
 *         "Extraversion": {
 *           "percentage": number
 *         },
 *         "Agreeableness": {
 *           "percentage": number
 *         },
 *         "Emotional range": {
 *           "percentage": number
 *         }
 *       }
 *     }
 *   },
 *   "Needs": {
 *     "Self-expression": {
 *       "percentage": number,
 *       "details": {
 *         "Challenge": {
 *           "percentage": number
 *         },
 *         "Closeness": {
 *           "percentage": number
 *         },
 *         "Curiosity": {
 *           "percentage": number
 *         },
 *         "Excitement": {
 *           "percentage": number
 *         },
 *         "Harmony": {
 *           "percentage": number
 *         },
 *         "Ideal": {
 *           "percentage": number
 *         },
 *         "Liberty": {
 *           "percentage": number
 *         },
 *         "Love": {
 *           "percentage": number
 *         },
 *         "Practicality": {
 *           "percentage": number
 *         },
 *         "Self-expression": {
 *           "percentage": number
 *         },
 *         "Stability": {
 *           "percentage": number
 *         },
 *         "Structure": {
 *           "percentage": number
 *         }
 *       }
 *     }
 *   },
 *   "Values": {
 *     "Hedonism": {
 *       "percentage": number,
 *       "details": {
 *         "Conservation": {
 *           "percentage": number
 *         },
 *         "Openness to change": {
 *           "percentage": number
 *         },
 *         "Hedonism": {
 *           "percentage": number
 *         },
 *         "Self-enhancement": {
 *           "percentage": number
 *         },
 *         "Self-transcendence": {
 *           "percentage": number
 *         }
 *       }
 *     }
 *   }
 * }}
 */
function parseResponse(response) {
  return _.chain(response.tree.children)
  .groupBy('name')
  .mapValues('0.children.0')
  .mapValues(e => {
    let o = {};
    o[e.name] = {
      percentage: e.percentage,
      details   : _.chain(e.children).groupBy('name').mapValues('0').mapValues(e => {
        return {
          percentage: e.percentage
        }
      }).value()
    }
    return o;
  })
  .value();
}

export default {
  personalityInsights(text) {
    // return Promise.resolve(dummy);
    return new Promise((resolve, reject) => {
      personalityInsightsApi.profile({
        text,
        url: config.ibm.personalityInsights.url
      }, (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(parseResponse(result));
      });
    });
  }
};
