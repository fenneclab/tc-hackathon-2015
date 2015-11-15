# -*- coding: utf-8 -*-
import json
import os 
# 3rd party
from lshash import LSHash

#
from db import user_db
from models import User

WORK_DIR = '/var/www'

LSH_HASH_SIZE = 1  # ハッシュを何bitにするのか
LSH_INPUT_DIM = 52  # 入力ベクトルの次元数
LSH_NUM_HASHTABLES = 1  #


def make_lsh_engine(dim):
    lsh_engine = LSHash(
        LSH_HASH_SIZE,
        dim,
        LSH_NUM_HASHTABLES,
        # storage_config=LSH_STORAGE_CONF,
    )

    return lsh_engine


def make_lsh_model():
    keys = user_db.keys('*')
    users = []
    for id in keys:
        print 'id'
        user_json = user_db.get(id)
        user = User(json.loads(user_json), id)
        users.append(user)

    dim = users[0].vector_dim
    lsh_engine = make_lsh_engine(dim)

    print users
    for user in users:
        lsh_engine.index(user.vector, user.id)

    return lsh_engine


def query(user_dict):
    user = User(user_dict)
    lsh_engine = make_lsh_model()
    candidates = lsh_engine.query(user.vector)
    results = []
    # print candidates
    for candidate in candidates:
        print candidate
        (vector, id), distance = candidate
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
