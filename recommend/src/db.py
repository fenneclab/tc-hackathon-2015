# -*- coding: utf-8 -*-
import os

# 3rd party
import redis


REDIS_RECOMMEND_HOST = os.environ.get('REDIS_RECOMMEND_PORT_6379_TCP_ADDR')
REDIS_RECOMMEND_PORT = 6379

REDIS_USER_HOST = os.environ.get('REDIS_USER_PORT_6379_TCP_ADDR')
REDIS_USER_PORT = 6379

recommend_db = redis.Redis(
    host=REDIS_RECOMMEND_HOST,
    port=REDIS_RECOMMEND_PORT,
)

user_db = redis.Redis(
    host=REDIS_USER_HOST,
    port=REDIS_USER_PORT,
)
