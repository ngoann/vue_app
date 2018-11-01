import authentication from '../../api/authentication'
var localStorage = require('localStorage')

// initial state
const state = {
  auth: JSON.parse(localStorage.getItem('report_app_auth')),
  name: null,
  username: null,
  password: null,
  remember: false,
  back_url: '/',
  token: localStorage.getItem('report_app_token'),
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
      if (res) {
        commit('setState', {name: 'name', value: res.user.name})
        commit('setState', {name: 'token', value: res.user.token})
        commit('setAuth', res.auth)
      } else {
        commit('setAuth', res)
      }
    })
  },
  sign_up({ commit, state }) {
    authentication.sign_up({username: state.username, password: state.password, name: state.name}, res => {
      if (res) {
        commit('setState', {name: 'name', value: res.user.name})
        commit('setState', {name: 'token', value: res.user.token})
        commit('setAuth', res.auth)
      } else {
        commit('setAuth', res)
      }
    })
  },
  logout({ commit }) {
    commit('setAuth', false)
    localStorage.setItem('report_app_token', '')
  },
  authenticate_token({ commit, state }) {
    authentication.authenticate_token(res => {
      if (res) {
        commit('setState', {name: 'name', value: res.user.name})
        commit('setState', {name: 'token', value: res.user.token})
        commit('setAuth', res.auth)
      } else {
        commit('setAuth', res)
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
  setState(state, payload) {
    state[payload.name] = payload.value
  }

  // decrementProductInventory (state, { id }) {
  //   const product = state.all.find(product => product.id === id)
  //   product.inventory--
  // }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
