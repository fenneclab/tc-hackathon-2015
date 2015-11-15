# -*- coding: utf-8 -*-
import json
import os 
# 3rd party
from lshash import LSHash
import time
#
from db import REDIS_RECOMMEND_HOST, REDIS_RECOMMEND_PORT
from models import User

WORK_DIR = '/var/www'

LSH_HASH_SIZE = 1  # ハッシュを何bitにするのか
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


def query(user_dict):
    for i in range(10):
        results = _query(user_dict)

        if results:
            return results
        else:
            time.sleep(0.1)


def _query(user_dict):
    user = User(user_dict)
    # lsh_engine = make_lsh_model()
    dim = user.vector_dim
    lsh_engine = make_lsh_engine(dim)
    candidates = lsh_engine.query(user.vector)
    results = []
    print candidates
    for candidate in candidates:
        print candidate
        data_text, distance = candidate
        data = eval(data_text)
        print data
        (vector, id) = data
        # print vector
        # print meta_json
        # print distance
        results.append({
            'id': id,
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
    # user = User(user_dict)
    result = query(user_dict)
    print result
