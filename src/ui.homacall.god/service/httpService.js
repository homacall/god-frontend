/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

axios.defaults.headers.post["Content-Type"] = "multipart/form-data";



export default {
    post: axios.post,
};
