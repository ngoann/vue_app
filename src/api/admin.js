const axios = require('axios')

export default {
  fetch_projects(payload, callback) {
    axios.get(process.env.API_SERVER + '/api/admin/projects', {params: payload})
    .then(function (response) {
      callback(response.data)
    })
    .catch(function (error) {
      callback({status: false, message: "Error!"})
    });
  },
  add_members_into_project(payload, callback) {
    axios.post(process.env.API_SERVER + '/api/admin/projects/add_member', payload)
    .then(function (response) {
      callback(response.data)
    })
    .catch(function (error) {
      callback({status: false, message: "Error!"})
    });
  },
  fetch_project_infor(payload, callback) {
    axios.post(process.env.API_SERVER + '/api/admin/projects/infor', payload)
    .then(function (response) {
      callback(response.data)
    })
    .catch(function (error) {
      callback({status: false, message: "Error!"})
    });
  },
  remove_member_in_project(payload, callback) {
    axios.get(process.env.API_SERVER + '/api/admin/projects/members', {params: payload})
    .then(function (response) {
      callback(response.data)
    })
    .catch(function (error) {
      callback({status: false, message: "Error!"})
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
