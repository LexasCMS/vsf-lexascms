import axios, { AxiosRequestConfig } from 'axios';
import config from 'config'
import Jsona from 'jsona';
import * as qs from 'qs';

import { SET_LEXASCMS_DATA } from './mutation-types';

export const LexascmsStore = {
  namespaced: true,

  state: {
    data: {}
  },

  actions: {
    getData ({ commit }, args) {
      // Fetch data from LexasCMS
      return new Promise(async (resolve) => {
        try {
          // Prepare request options
          const requestOptions: AxiosRequestConfig = {
            baseURL: `https://${config.lexascms.spaceId}.spaces.lexascms.com/delivery/jsonapi`,
            headers: {
              'Content-Type': 'application/vnd.api+json'
            },
            params: args.params,
            paramsSerializer: (params) => qs.stringify(params)
          };
          // Send request
          const response = await axios.get(args.path, requestOptions);
          // Deserialize JSON:API response
          const dataFormatter = new Jsona();
          const data = dataFormatter.deserialize(response.data);
          // Commit data to store
          commit(SET_LEXASCMS_DATA, {
            key: JSON.stringify(args),
            value: data
          });
          // Resolve
          resolve(data);
        } catch (e) {
          resolve({ error: 'Error fetching item from LexasCMS' })
        }
      });
    }
  },

  mutations: {
    [SET_LEXASCMS_DATA] (state, { key, value }) {
      state.data[key] = value;
    }
  },

  getters: {
    data: (state) => (key) => state.data[key]
  }
}
