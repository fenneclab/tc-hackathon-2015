# -*- coding: utf-8 -*-
import glob
import os

# 3rd party
import redis

# 
from db import user_db

WORK_DIR = '/var/www'
TARGET_JSON_DIR = '/var/tmp/sample'


def sample_user_list():
    target_jsons = glob.glob(TARGET_JSON_DIR + '/*.json')
    results = []

    for json_file in target_jsons:
        f = open(json_file, 'r')
        result = f.read()
        f.close()
        id, ext = os.path.splitext(os.path.basename(json_file))
        # print id
        results.append({
            'id': id,
            'json_data': result,
        })
    return results


if __name__ == "__main__":
    user_db.flushall()
    sample_users = sample_user_list()

    for user in sample_users:
        id = user['id']
        json_data = user['json_data']
        user_db.set(id, json_data)
