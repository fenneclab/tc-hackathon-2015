# -*- coding: utf-8 -*-
import os
import json
import pickle

# 3rd party
import redis
from lshash import LSHash

#
from db import REDIS_RECOMMEND_HOST, REDIS_RECOMMEND_PORT, recommend_db, user_db
from models import User

WORK_DIR = '/var/www'

LSH_HASH_SIZE = 10   # ハッシュを何bitにするのか
LSH_INPUT_DIM = 52  # 入力ベクトルの次元数
LSH_NUM_HASHTABLES = 1  #
LSH_STORAGE_CONF = {
    "redis": {
        "host": REDIS_RECOMMEND_HOST,
        "port": REDIS_RECOMMEND_PORT,
        # "db": 0,
    }
}


def make_lsh_engine(dim):
    lsh_engine = LSHash(
        LSH_HASH_SIZE,
        dim,
        LSH_NUM_HASHTABLES,
        storage_config=LSH_STORAGE_CONF,
    )

    return lsh_engine


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
