import api from "./api";

export const loginRequest = (email, password, callback) => {
  // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZvbG9keW15ci5zb2xjaGFueWtAZ21haWwuY29tIiwiY3JlYXRlX2RhdGUiOiIyMDI0LTAxLTI0IDA3OjMwOjA3LjY0NTY3MiJ9.YWDMB3J4omrUTN6BEQlzlRcl0GtEE9AugMGuKU9RIk0"
  // const resp = {"success":true,"message":"Error happened", token};
  // callback(resp);
  api.post(`/login`, { email, password })
  .then(res => {
      callback(res.data);
  }).catch(err => {
      callback({success: false, error: err.message || err});
  })
};

export const logoutRequest = (token, callback) => {
  api.post(`/logout`, { token })
    .then(res => {
        callback(res.data);
    }).catch(err => {
        callback({success: false, error: err.message || err});
    })
};