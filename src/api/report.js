const axios = require('axios')
var localStorage = require('localStorage')

export default {
  save(payload, callback) {
    axios.post(process.env.API_SERVER + '/api/reports', payload)
    .then(function (response) {
      callback(response.data.status)
    })
    .catch(function (error) {
      callback(false)
    });
  },
  find(payload, callback) {
    axios.post(process.env.API_SERVER + '/api/reports/find', payload)
    .then(function (response) {
      callback(response.data)
    })
    .catch(function (error) {
      callback({status: false})
    });
  },
  export_csv(payload, callback) {
    axios.post(process.env.API_SERVER + '/api/reports/export_csv', payload)
    .then(function (response) {
      callback(response.data)
    })
    .catch(function (error) {
      callback({status: false})
    });
  }
}
