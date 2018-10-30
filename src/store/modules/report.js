import report_api from '../../api/report'
var localStorage = require('localStorage')
var moment = require('moment');
const DATE_FORMAT = 'DD/MM/YYYY';

const state = {
  reports: {},
  setting: {},
  selected: null,
  rooms: [],
  room_id: null,
  members: {},
  configs: {
    room_id: null,
    members: {},
    selected_members: {}
  },
  selected_date_string: moment().format(DATE_FORMAT),
  today_date_string: moment().format(DATE_FORMAT),
  prev_date_string: moment().format("YYYY-MM-DD") + "T00:00:00.000Z",
  next_date_string: moment().add('days', 1).format(DATE_FORMAT),
  report: {
    title: null,
    today_plan: null,
    actual_archiverment: null,
    next_plan: null,
    issues: null,
    daily_report: null
  },
  report_nil: {
    title: null,
    today_plan: null,
    actual_archiverment: null,
    next_plan: null,
    issues: null,
    daily_report: null
  }
}

// getters
const getters = {
  current_report(state) {
    return state.reports[state.selected_date_string] || {
      room_id: "",
      members: {},
      title: "",
      today_plan: "",
      actual_archiverment: "",
      next_plan: "",
      issues: "",
      daily_report: ""
    }
  }
}

// actions
const actions = {
  save({commit, state, rootState}) {
    report_api.save({report: state.report, date: state.selected_date_string, token: rootState.authentication.token}, status => {
      // commit('setAuth', status)
    })
  }
}

// mutations
const mutations = {
  set_selected_memebers(state, member_id) {
    state.configs.selected_members[state.configs.room_id] = state.configs.selected_members[state.configs.room_id] || []
    state.configs.selected_members[state.configs.room_id].push(member_id);
    localStorage.setItem('configs', JSON.stringify(state.configs));
  },
  remove_selected_memebers(state, member_id) {
    state.configs.selected_members[state.configs.room_id] = state.configs.selected_members[state.configs.room_id] || []
    if (state.configs.selected_members[state.configs.room_id].length > 0) {
      var index_of_member = state.configs.selected_members[state.configs.room_id].indexOf(member_id);

      if (index_of_member != -1) {
        state.configs.selected_members[state.configs.room_id].splice(index_of_member, 1);
      }
    }
    localStorage.setItem('configs', JSON.stringify(state.configs));
  },
  set_state(state, params) {
    state[params.name] = params.value

    if (params.name == 'configs') {
      localStorage.setItem('configs', JSON.stringify(state.configs));
    }

    if (params.name == 'report') {
      var next_plan_date = moment(state.selected_date_string, DATE_FORMAT).add('days', 1).format(DATE_FORMAT)

      state.reports[next_plan_date] = state.reports[next_plan_date] || state.report_nil
      state.reports[next_plan_date].today_plan = params.value.next_plan
      state.reports[next_plan_date].title = params.value.title
      state.reports[next_plan_date].daily_report = params.value.daily_report

      if (moment(state.selected_date_string, DATE_FORMAT) >= moment(state.today_date_string, DATE_FORMAT)) {
        state.reports[state.selected_date_string] = params.value;
      }

      localStorage.setItem('reports', JSON.stringify(state.reports));
    }
  },


  setState(state, params) {
    state[params.name] = params.value
  },
  setReportState(state, params) {
    state.report[params.name] = params.value.trim()
  },
  setConfigState(state, params) {
    state.configs[params.name] = params.value
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
