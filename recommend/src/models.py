# -*- coding: utf-8 -*-
import json

import numpy as np

class User:
    def __init__(self, user_dic):
        self.name = user_dic['meta']['name']
        self.vector = self.data_to_vec(user_dic['data'])
        self.vector_dim = self.vector.shape[0]

    def __repr__(self):
        return "User name:{0} vector:{1}".format(self.name, self.vector)

    @property
    def meta(self):
        return {
            'name': self.name,
        }

    @property
    def meta_json(self):
        return json.dumps(self.meta)

    
    def data_to_vec(self, data):
        """
        性格と確率の組み合わせdictを
        numpyarrayに変換する。

        input:
        { 
        "性格" : 確率,
        "性格" : 確率,
        }
        
        """
        vec_list = []
        print data
        for personality, prob in data.iteritems():
            vec_list.append(prob)

        vec = np.array(vec_list)
        print vec
        print vec.shape[0]

        return vec
            
