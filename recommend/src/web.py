# -*- coding: utf-8 -*-
import os

from flask import Flask, jsonify, request
from flask.ext.cors import CORS

DEBUG = True
PORT = 8080

app = Flask(__name__)
# cross domain でアクセス可能にする
CORS(app)

WORK_DIR = '/var/www'


def example_response_json():
    f = open(WORK_DIR + '/example_response.json', 'r')
    results = f.read()
    f.close()
    return results


def example_response():
    import json
    response = json.loads(example_response_json())
    print response
    # result = {'result': }
    # return jsonify(result)
    return jsonify(response)


# index にアクセスしたときの処理
@app.route('/reccomend/v1/', methods=['GET'])
def index():
    user_json = request.args.get('user', '')
    print user_json

    return example_response()

    # result = {'result': }
    # return jsonify(result)
    # return jsonify(response)

if __name__ == '__main__':
    app.debug = DEBUG
    app.run(host='0.0.0.0', port=PORT)
