import http from "./httpService";
import config from "./config.json";


export const loginUser = user => {
    return http.post(`${config.godapi}/api/LoginGod/Login`, JSON.stringify(user));
};