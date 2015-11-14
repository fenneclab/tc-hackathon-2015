# -*- coding: utf-8 -*-
import os
import json
import operator


# 3rd party
from lshash import LSHash
import redis

#
from models import User

REDIS_HOST = os.environ.get('REDIS_PORT_6379_TCP_ADDR')
REDIS_PORT = 6379

LSH_HASH_SIZE = 10   # ハッシュを何bitにするのか
LSH_INPUT_DIM = 52  # 入力ベクトルの次元数
LSH_NUM_HASHTABLES = 100  #
LSH_STORAGE_CONF = {
    "redis": {
        "host": REDIS_HOST,
        "port": REDIS_PORT,
        "db": 128,
    }
}

# for docker
DB_HOST = os.environ.get("DB_PORT_3306_TCP_ADDR")
DB_USER = 'root'  # os.environ.get("DB_1_PORT_3306_TCP_ADDR")
DB_PASSWORD = os.environ.get("DB_ENV_MYSQL_ROOT_PASSWORD")
DB_DATABASE = os.environ.get("DB_ENV_MYSQL_DATABASE")


lsh_engine = LSHash(
    LSH_HASH_SIZE,
    LSH_INPUT_DIM,
    LSH_NUM_HASHTABLES,
    storage_config=LSH_STORAGE_CONF,
)


def example_json_results():
    f = open('example_personal_api_results.json', 'r')
    results = f.read()
    f.close()
    return results


json_results = example_json_results()
# print(json_results)

results = json.loads(json_results)

print(results)

users_dict = results[u'results']

users = []
for user_dict in users_dict:
    # print user_dict
    u = User(user_dict)
    users.append(u)


print users

for user in users:
    # print user
    lsh_engine.index(user.vector, user.meta_json)




query_user = users[2]
candidates = lsh_engine.query(query_user.vector)

print candidates

for candidate in candidates:
    print candidate
    (vector, meta_json), distance = candidate
    print vector
    print meta_json
    print distance



