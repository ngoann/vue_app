const axios = require('axios')

export default {
  fetch_projects(payload, callback) {
    axios.get(process.env.API_SERVER + '/api/admin/projects', {params: payload})
    .then(function (response) {
      callback(response.data)
    })
    .catch(function (error) {
      callback({status: false})
    });
  },
  create_project(payload, callback) {
    axios.post(process.env.API_SERVER + '/api/admin/projects', payload)
    .then(function (response) {
      callback(response.data)
    })
    .catch(function (error) {
      callback({status: false, message: "Error!"})
    });
  }
}
