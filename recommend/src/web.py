import os

from flask import Flask, jsonify, request
from flask.ext.cors import CORS

DEBUG = True
PORT = 8080

app = Flask(__name__)
# cross domain でアクセス可能にする
CORS(app)

# index にアクセスしたときの処理
@app.route('/', methods=['GET', 'POST'])
def index():
    
    
    
    result = {'data': detections}
    return jsonify(result)

if __name__ == '__main__':
    app.debug = DEBUG
    app.run(host='0.0.0.0', port=PORT)
