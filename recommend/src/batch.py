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

redis_db = redis.Redis(host=REDIS_HOST, port=REDIS_PORT,)


def example_json_results():
    f = open('example_personal_api_results.json', 'r')
    results = f.read()
    f.close()
    return results


def make_redis_db(users_data):
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
        redis_db.set(user.id, user.json)


if __name__ == "__main__":
    redis_db.flushall()
    json_results = example_json_results()
    results = json.loads(json_results)
    users_data = results[u'results']
    make_redis_db(users_data)
