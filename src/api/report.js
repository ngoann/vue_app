const axios = require('axios');
var localStorage = require('localStorage')

export default {
  save(payload, callback) {
    axios.post(process.env.API_SERVER + '/api/reports', payload)
    .then(function (response) {
      // if (response.data.status) {
      //   localStorage.setItem('report_app_token', response.data.user.token)
      // }
      callback(response.data.status)
    })
    .catch(function (error) {
      callback(false)
    });
  }
}
