import os

from flask import Flask, jsonify, request
from flask.ext.cors import CORS

DEBUG = True
PORT = 8080

app = Flask(__name__)
# cross domain でアクセス可能にする
CORS(app)

# index にアクセスしたときの処理
@app.route('/v1/', methods=['GET'])
def index():
    user_json = request['user']

    import json
    response = json.load(example_response())
    # result = {'result': }
    # return jsonify(result)
    return jsonify(response)

if __name__ == '__main__':
    app.debug = DEBUG
    app.run(host='0.0.0.0', port=PORT)



def example_response():
    f = open('example_response.json', 'r')
    results = f.read()
    f.close()
    return results
