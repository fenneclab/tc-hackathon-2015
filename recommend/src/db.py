# -*- coding: utf-8 -*-
import os

# 3rd party
import redis


REDIS_RECOMMENTD_HOST = os.environ.get('REDIS_RECOMMENTD_PORT_6379_TCP_ADDR')
REDIS_RECOMMENTD_PORT = 6379

REDIS_RECOMMENTD_HOST = os.environ.get('REDIS_USER_PORT_6379_TCP_ADDR')
REDIS_RECOMMENTD_PORT = 6379

recommend_db = redis.Redis(
    host=REDIS_RECOMMENTD_HOST,
    port=REDIS_RECOMMENTD_PORT,
)
