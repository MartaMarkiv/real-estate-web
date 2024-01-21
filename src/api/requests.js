import api from "./api";

export const loginRequest = (email, password, callback) => {
  const resp = {"success":true,"message":"Error happened","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZvbG9keW15ci5zb2xjaGFueWtAZ21haWwuY29tIiwiY3JlYXRlX2RhdGUiOiIyMDI0LTAxLTE5IDE2OjA4OjE3LjE2MTk0NSJ9.y1sgaPpxCdIwIwySNhcb16lbyYZeFnk6kd3H7LFYDdY"};
  callback(resp);
  // api.post(`/login`, { email, password })
  // .then(res => {
  //     callback(res);
  // }).catch(err => {
  //     callback({success: false, error: err.message || err});
  // })
};

export const logoutRequest = (token, callback) => {
  api.post(`/logout`, { token })
    .then(res => {
        callback(res.data);
    }).catch(err => {
        callback({success: false, error: err.message || err});
    })
};