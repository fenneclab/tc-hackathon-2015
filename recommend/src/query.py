# -*- coding: utf-8 -*-
import os
import json
import pickle

# 3rd party
from lshash import LSHash
import redis

#
from models import User

WORK_DIR = '/var/www'
REDIS_HOST = os.environ.get('REDIS_PORT_6379_TCP_ADDR')
REDIS_PORT = 6379

LSH_HASH_SIZE = 10   # ハッシュを何bitにするのか
LSH_INPUT_DIM = 52  # 入力ベクトルの次元数
LSH_NUM_HASHTABLES = 100  #
LSH_STORAGE_CONF = {
    "redis": {
        "host": REDIS_HOST,
        "port": REDIS_PORT,
        "db": 0,
    }
}


db = redis.Redis(host=REDIS_HOST, port=REDIS_PORT,)

lsh_engine = LSHash(
    LSH_HASH_SIZE,
    LSH_INPUT_DIM,
    LSH_NUM_HASHTABLES,
    # storage_config=LSH_STORAGE_CONF,
)


def make_lsh_model():
    keys = db.keys('*')
    users = []
    for key in keys:
        print key
        user_json = db.get(key)
        user = User(json.loads(user_json))
        users.append(user)

    for user in users:
        lsh_engine.index(user.vector, user.meta_json)

    return lsh_engine


def query(user_dict):
    user = User(user_dict)
    lsh_engine = make_lsh_model()
    candidates = lsh_engine.query(user.vector)
    results = []
    print candidates
    for candidate in candidates:
        # print candidate
        (vector, meta_json), distance = candidate
        # print vector
        # print meta_json
        # print distance
        results.append({
            'meta': json.loads(meta_json),
            'distance': distance
        })

    return results


def example_user_query_json():
    f = open('example_user_query.json', 'r')
    results = f.read()
    f.close()
    return results


if __name__ == "__main__":
    user_json = example_user_query_json()
    user_dict = json.loads(user_json)
    result = query(user_dict)
    print result
