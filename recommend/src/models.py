# -*- coding: utf-8 -*-
import json
import pickle

import numpy as np


class User:
    def __init__(self, data, id=0):
        flat, big5, needs, values = self.parse_data(data)
        self.id = id
        self.data = data
        self.vector = self.flat_to_vec(flat)
        self.vector_dim = self.vector.shape[0]

    def __repr__(self):
        return "User id:{0} vector:{1}".format(self.id, self.vector)

    @property
    def json(self):
        return json.dumps(self.data)

    @property
    def vectour_pickled(self):
        return pickle.dumps(self.vector)

    def parse_data(self, data):
        """
        inputのdictから、以下のoutputを作って返す。

        flat: すべての性格:パーセントがフラットになってるdict
        big5: bi5のdict
        needs: needsのdict
        values: valuesのdict
        """
        BIG5_KEY = 'Big 5'
        NEEDS_KEY = 'Needs'
        VALUES_KEY = 'Values'
        # big5 = data['Big 5']
        # needs = data['Needs']
        # values = data['Values']

        flat = {}
        big5 = {}
        needs = {}
        values = {}

        for category_key, parents in data.iteritems():
            # print 'parent'
            # print category_key, parents
            for parent_key, parent_data in parents.iteritems():
                parent_percentage = parent_data['percentage']
                children = parent_data['details']
                # print 'parent_data'
                # print parent_key, parent_percentage, children

                flat[parent_key] = parent_percentage

                if category_key == BIG5_KEY:
                    big5[parent_key] = parent_percentage

                if category_key == NEEDS_KEY:
                    needs[parent_key] = parent_percentage

                if category_key == VALUES_KEY:
                    values[parent_key] = parent_percentage

                for children_key, children_data in children.iteritems():
                    # print 'children_data'
                    children_percentage = children_data['percentage']
                    # print children_key, children_percentage

                    flat[children_key] = children_percentage

                    if category_key == BIG5_KEY:
                        big5[children_key] = children_percentage

                    if category_key == NEEDS_KEY:
                        needs[children_key] = children_percentage

                    if category_key == VALUES_KEY:
                        values[children_key] = children_percentage

        # print flat
        # print big5
        # print needs
        # print values
        return flat, big5, needs, values

    def flat_to_row_vec(self, flat):
        """
        性格と確率の組み合わせdictを
        listに変換する。
        """
        vec_list = []
        for personality, prob in flat.iteritems():
            vec_list.append(prob)

        return vec_list

    def flat_to_vec(self, flat):
        """
        性格と確率の組み合わせdictを
        nparrayに変換する。
        """
        vec_list = self.flat_to_row_vec(flat)
        vec = np.array(vec_list)

        return vec
