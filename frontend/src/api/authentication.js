const axios = require('axios')
var localStorage = require('localStorage')

export default {
  sign_in(payload, callback) {
    axios.post(process.env.API_SERVER + '/api/auth/sign_in', payload)
    .then(function (response) {
      if (response.data.user) {
        localStorage.setItem('report_app_token', response.data.user.token)
      }
      callback(response.data)
    })
    .catch(function (error) {
      callback({auth: false})
    });
  },
  sign_up(payload, callback) {
    axios.post(process.env.API_SERVER + '/api/auth/sign_up', payload)
    .then(function (response) {
      if (response.data.user) {
        localStorage.setItem('report_app_token', response.data.user.token)
      }
      callback(response.data)
    })
    .catch(function (error) {
      callback({auth: false})
    });
  },
  authenticate_token(callback) {
    var token = localStorage.getItem('report_app_token')

    if (token && token != "") {
      axios.post(process.env.API_SERVER + '/api/auth/authenticate_token', {token: token})
      .then(function (response) {
        callback(response.data)
      })
      .catch(function (error) {
        callback({auth: false})
      });
    } else {
      callback({auth: false})
    }
  }
}
