# -*- coding: utf-8 -*-
import os
import json
import pickle

# 3rd party
import redis

#
from models import User

WORK_DIR = '/var/www'
REDIS_HOST = os.environ.get('REDIS_PORT_6379_TCP_ADDR')
REDIS_PORT = 6379

db = redis.Redis(host=REDIS_HOST, port=REDIS_PORT,)


def example_json_results():
    f = open('example_personal_api_results.json', 'r')
    results = f.read()
    f.close()
    return results


def make_db(users_dict):
    users = []

    for user_dict in users_dict:
        u = User(user_dict)
        users.append(u)

    for user in users:
        # print user
        db.set(user.id, user.json)


if __name__ == "__main__":
    json_results = example_json_results()
    results = json.loads(json_results)
    users_dict = results[u'results']
    make_db(users_dict)
