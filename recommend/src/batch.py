# -*- coding: utf-8 -*-
import os
import json

# 3rd party
import redis
from lshash import LSHash

#
from db import REDIS_RECOMMEND_HOST, REDIS_RECOMMEND_PORT, recommend_db, user_db
from models import User

WORK_DIR = '/var/www'

LSH_HASH_SIZE = 1   # ハッシュを何bitにするのか
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

if __name__ == "__main__":
    recommend_db.flushall()
    make_lsh_model()
