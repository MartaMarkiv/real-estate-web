import api from "./api";

export const loginRequest = (email, password, callback) => {
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

export const clearNotification = (ids, callback) => {
  api.post(`/disable_notification`, { ids })
  .then(res => {
    console.log("disable_notification");
    console.log(res);
    callback(res.data);
  }).catch(err => {
    callback({success: false, error: err.message || err});
  })
};

export const sendUserMessage = (response_email, telegram_id, action, callback) => {
  api.post(`/answer`, { response_email, telegram_id, action, lang: "UA" })
  .then(res => {
    console.log("/answer");
    console.log(res);
    callback(res.data);
  }).catch(err => {
    callback({success: false, error: err.message || err});
  })
};