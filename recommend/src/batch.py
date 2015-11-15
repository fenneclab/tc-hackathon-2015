# -*- coding: utf-8 -*-
import os
import json
import pickle

# 3rd party
import redis

#
from models import User

WORK_DIR = '/var/www'
REDIS_RECOMMENTD_HOST = os.environ.get('REDIS_RECOMMENTD_PORT_6379_TCP_ADDR')
REDIS_RECOMMENTD_PORT = 6379

REDIS_RECOMMENTD_HOST = os.environ.get('REDIS_USER_PORT_6379_TCP_ADDR')
REDIS_RECOMMENTD_PORT = 6379

recommend_db = redis.Redis(
    host=REDIS_RECOMMENTD_HOST,
    port=REDIS_RECOMMENTD_PORT,
)


def example_json_results():
    f = open('example_personal_api_results.json', 'r')
    results = f.read()
    f.close()
    return results


def make_recommend_db(users_data):
    users = []

    for i, user_dict in enumerate(users_data):
        print i
        id = i + 1
        print user_dict
        print "*" * 40
        u = User(user_dict, id)
        users.append(u)

    for user in users:
        # print user
        recommend_db.set(user.id, user.json)


if __name__ == "__main__":
    recommend_db.flushall()
    json_results = example_json_results()
    results = json.loads(json_results)
    users_data = results[u'results']
    make_recommend_db(users_data)
