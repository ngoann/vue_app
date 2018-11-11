import authentication from '../../api/authentication'
import admin from '../../api/admin'
var localStorage = require('localStorage')

// initial state
const state = {
  auth: JSON.parse(localStorage.getItem('report_app_auth')),
  admin: JSON.parse(localStorage.getItem('report_app_admin')),
  user_data: {},
  projects: {},
  current_project: {},
  name: null,
  username: null,
  password: null,
  remember: false,
  back_url: '/',
  token: localStorage.getItem('report_app_token'),
  messages: [
    {type: 'success', message: "OK DONE!"}
  ]
}

// getters
const getters = {
  getAuth(state) {
    return state.auth
  },
  getState(state, name_state) {
    return state[name_state]
  },
  getUsername(state) {
    return state.username
  },
  getPassword(state) {
    return state.password
  },
  getRemember(state) {
    return state.remember
  },
  getName(state) {
    return state.name
  },
  getToken(state) {
    return state.token
  }
}

// actions
const actions = {
  sign_in({ commit, state }) {
    authentication.sign_in({username: state.username, password: state.password, remember: state.remember}, res => {
      if (res.auth) {
        commit('setAdmin', res.user.admin)
        commit('setState', {name: 'name', value: res.user.name})
        commit('setState', {name: 'token', value: res.user.token})
        commit('setAuth', res.auth)
        commit('setState', {name: 'user_data', value: res.user_data})
        commit('setState', {name: "messages", value: {type: 'success', message: 'Login success!'}})
      } else {
        commit('setAuth', res.auth)
        commit('setState', {name: "messages", value: {type: 'error', message: 'Login failed!'}})
      }
    })
  },
  sign_up({ commit, state }) {
    authentication.sign_up({username: state.username, password: state.password, name: state.name}, res => {
      if (res.auth) {
        commit('setAdmin', res.user.admin)
        commit('setState', {name: 'name', value: res.user.name})
        commit('setState', {name: 'token', value: res.user.token})
        commit('setAuth', res.auth)
        commit('setState', {name: 'user_data', value: res.user_data})
        commit('setState', {name: "messages", value: {type: 'success', message: 'Sign up success!'}})
      } else {
        commit('setAuth', res.auth)
      }
    })
  },
  logout({ commit }) {
    commit('setAuth', false)
    commit('setAdmin', false)
    localStorage.setItem('report_app_token', '')
  },
  authenticate_token({ commit, state }) {
    authentication.authenticate_token(res => {
      if (res.auth) {
        commit('setAdmin', res.user.admin)
        commit('setState', {name: 'name', value: res.user.name})
        commit('setState', {name: 'token', value: res.user.token})
        commit('setState', {name: 'user_data', value: res.user_data})
        commit('setAuth', res.auth)
      } else {
        commit('setAuth', res.auth)
        commit('setAdmin', false)
      }
    })
  },
  update_current_project({ commit, state }, project_id) {
    authentication.update_current_project({token: state.token, project_id: project_id}, res => {
      if (res.status) {
        commit('setState', {name: "messages", value: {type: 'success', message: 'Change project success!'}})
      } else {
        commit('setState', {name: "messages", value: {type: 'error', message: res.message}})
      }
    })
  },
  fetch_projects({ commit, state }) {
    admin.fetch_projects({token: state.token}, res => {
      if (res.status) {
        commit('setState', {name: 'projects', value: res.projects})
      }
    })
  },
  fetch_project_infor({ commit, state }, project_id) {
    admin.fetch_project_infor({token: state.token, project_id: project_id}, res => {
      if (res.status) {
        commit('setState', {name: 'current_project', value: res})
      }
    })
  },
  add_members_into_project({ commit, state }, payload) {
    admin.add_members_into_project({token: state.token, project_id: payload.project_id, member_ids: payload.member_ids}, res => {
      if (res.status) {
        commit('setState', {name: 'current_project', value: res})
      }
    })
  },
  create_project({ commit, state }, name) {
    admin.create_project({project: {name: name}, token: state.token}, res => {
      if (res.status) {
        commit('setState', {name: 'projects', value: res.projects})
      } else {
        commit('setState', {name: 'messages', value: {type: 'error', message: res.message}})
      }
    })
  }
}

// mutations
const mutations = {
  setAuth(state, value) {
    localStorage.setItem('report_app_auth', value)
    state.auth = value
  },
  setAdmin(state, value) {
    localStorage.setItem('report_app_admin', value)
    state.admin = value
  },
  setState(state, payload) {
    state[payload.name] = payload.value
  },
  setMessage(state, value) {
    state.messages = value
  },
  setUserDataState(state, payload) {
    state.user_data[payload.name] = payload.value
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
