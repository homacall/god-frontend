/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
export default {
  post: axios.post,
  get: axios.get,
}
