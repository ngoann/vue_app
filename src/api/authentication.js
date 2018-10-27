const axios = require('axios');
var localStorage = require('localStorage')

export default {
  sign_in(payload, callback) {
    axios.post('http://localhost:3000/api/auth/sign_in', payload)
    .then(function (response) {
      if (response.data.user) {
        localStorage.setItem('report_app_token', response.data.user.token)
      }
      callback(response.data.auth)
    })
    .catch(function (error) {
      callback(false)
    });
  },
  sign_up(payload, callback) {
    axios.post('http://localhost:3000/api/auth/sign_up', payload)
    .then(function (response) {
      if (response.data.user) {
        localStorage.setItem('report_app_token', response.data.user.token)
      }
      callback(response.data.auth)
    })
    .catch(function (error) {
      callback(false)
    });
  },
  authenticate_token(callback) {
    var token = localStorage.getItem('report_app_token')

    if (token && token != "") {
      axios.post('http://localhost:3000/api/auth/authenticate_token', {token: token})
      .then(function (response) {
        callback(response.data.auth)
      })
      .catch(function (error) {
        callback(false)
      });
    } else {
      callback(false)
    }
  }
}