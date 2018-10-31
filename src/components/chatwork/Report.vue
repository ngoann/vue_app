<template>
  <div class="row">
    <div class="col-7">
      <card shadow class="" no-body>
        <div class="px-3 py-3">
          <div class="text-uppercase font-weight-bold title badge badge-primary">Report form:</div>
          <div class="text-center mt-3 mb-4">
            <datetime type="date" v-model="prev_date_string" input-class="btn btn-sm btn-secondary" format="dd/MM/yyyy"></datetime>
            <b-button size="sm" :variant="selected_date_string == today_date_string ? 'primary' : 'default'"
              @click="selected_plan(today_date_string)">
              Today plan
            </b-button>
            <b-button size="sm" variant="default" :variant="selected_date_string == next_date_string ? 'primary' : 'default'"
              @click="selected_plan(next_date_string)">
              Next plan
            </b-button>
          </div>
          <!-- <p>{{ to_member_string() }}</p> -->
          <div class="main-content" style="margin-bottom: 20px; font-size: 0.9rem;">
            <div class="report-title" v-html="">
              {{format_text(report.title)}} - Daily report {{selected_date_string}}
            </div>
            <div class="report-info">
              <h6 style="font-size: 0.91rem;">1. Today plan</h6>
              <TextareaEditable @saveReport="save" v-model="report.today_plan" :disabled="!check_allow_edit" />
              <h6 style="font-size: 0.91rem;">2. Actual archiverment</h6>
              <TextareaEditable @saveReport="save" v-model="report.actual_archiverment" :disabled="!check_allow_edit" />
              <h6 style="font-size: 0.91rem;">3. Next plan</h6>
              <TextareaEditable @saveReport="save" v-model="report.next_plan" :disabled="!check_allow_edit" />
              <h6 style="font-size: 0.91rem;">4. Issues</h6>
              <TextareaEditable @saveReport="save" v-model="report.issues" :disabled="!check_allow_edit" />
              <h6 style="font-size: 0.91rem;">5. Dailly Report</h6>
              <TextareaEditable @saveReport="save" v-model="report.daily_report" :disabled="!check_allow_edit" />
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <b-button size="sm" variant="success" @click="send_message">
                <i class="fa fa-paper-plane" aria-hidden="true"></i> Send
              </b-button>
              <b-button size="sm" variant="secondary" @click="copy_message">
                <i class="fa fa-clone" aria-hidden="true"></i> Copy the report
              </b-button>
            </div>
          </div>
          <div style="opacity: 0; height: 0px">
            <b-form-group>
              <b-form-textarea id="message_code" readonly :value="message_code" :rows="2" :max-rows="6">
              </b-form-textarea>
            </b-form-group>
          </div>
        </div>
      </card>
    </div>
    <div class="col-5">
      <card shadow class="" no-body>
        <div class="px-3 py-3">
          <div class="">
            <div class="text-uppercase font-weight-bold title badge badge-primary">Select room: </div>
            <b-form-select v-model="configs.room_id" :options="rooms"
              class="mb-3" size="sm" />
          </div>
          <div class="members" style="margin-bottom: 15px">
            <!-- <div class="text-uppercase font-weight-bold title badge badge-primary">Select users you want to [TO]: </div> -->
            <div class="">
              <User v-for="member in show_members" :member="member"
                :checked="member_is_checked(member.account_id)"
                :key="member.account_id + Date.now()" />
            </div>
          </div>
          <hr>
          <div class="content">
            <div class="text-uppercase font-weight-bold title badge badge-success">Export to CSV:</div>
            <div class="row">
              <div class="col-md-6">
                <label for=""><b>From date:</b></label>
                <datetime type="date" v-model="prev_date_string" :default-value="new Date()"
                input-class="btn btn-sm btn-secondary" format="dd/MM/yyyy"></datetime>
              </div>
              <div class="col-md-6">
                <label for=""><b>To date:</b></label>
                <datetime type="date" v-model="prev_date_string" :default-value="new Date()"
                input-class="btn btn-sm btn-secondary" format="dd/MM/yyyy"></datetime>
              </div>
              <hr>
              <div class="col-12 text-center">
                <b-button size="sm"variant="success">
                  <i class="fa fa-download" aria-hidden="true"></i> DOWNLOAD
                </b-button>
              </div>
            </div>
          </div>
        </div>
      </card>
    </div>
  </div>
</template>
<script>
import User from '@/components/chatwork/User'
import TextareaEditable from '@/components/customs/TextareaEditable'
import { mapGetters, mapState, mapActions, mapMutations } from 'vuex'
import { Datetime } from 'vue-datetime';

export default {
  components: {
    User, Datetime, TextareaEditable
  },
  data () {
    return {
      setting: {},
      selected: null,
      rooms: [],
      room_id: null,
      members: {},
    }
  },
  beforeCreate() {
    if(!this.$store.state.authentication.auth) {
      this.$store.commit('authentication/setState', {name: 'back_url', value: this.$router.currentRoute.path})
      this.$router.push('/login')
    }
  },
  created() {
    if (!this.$localStorage.get('configs')) {
      this.$localStorage.set('configs', JSON.stringify(this.configs));
    }

    this.configs = JSON.parse(this.$localStorage.get('configs'));
    this.$store.commit('report/set_state', {name: 'configs', value: this.configs})
    if (this.$store.state.authentication.auth) {
      this.fetch_report();
      this.get_rooms();
    }
  },
  watch: {
    selected_date_string: function(val) {
      this.fetch_report();
    },
    prev_date_string: function (val) {
      if (val) {
        this.selected_plan(this.$moment(val).format("DD/MM/YYYY"))
      }
    },
    report: function (val) {
      this.report.title = this.name
    }
  },
  computed: {
    ...mapState('authentication', [
      'auth', 'name'
    ]),
    ...mapState('report', [
      'report', 'selected_date_string', 'today_date_string', 'prev_date_string',
      'next_date_string', 'configs'
    ]),
    selected_date_string: {
      get: function() {
        return this.$store.state.report.selected_date_string;
      },
      set: function (newValue) {
        this.setState({name: 'selected_date_string', value: newValue})
      }
    },
    today_date_string: {
      get: function() {
        return this.$store.state.report.today_date_string;
      },
      set: function (newValue) {
        this.setState({name: 'today_date_string', value: newValue})
      }
    },
    prev_date_string: {
      get: function() {
        return this.$store.state.report.prev_date_string;
      },
      set: function (newValue) {
        this.setState({name: 'prev_date_string', value: newValue})
      }
    },
    next_date_string: {
      get: function() {
        return this.$store.state.report.next_date_string;
      },
      set: function (newValue) {
        this.setState({name: 'next_date_string', value: newValue})
      }
    },
    report: {
      title: {
        get: function() {
          return this.$store.state.report.report.title;
        },
        set: function (newValue) {
          this.setReportState({name: 'title', value: newValue})
        }
      },
      today_plan: {
        get: function() {
          return this.$store.state.report.report.today_plan;
        },
        set: function (newValue) {
          this.setReportState({name: 'today_plan', value: newValue})
        }
      },
      actual_archiverment: {
        get: function() {
          return this.$store.state.report.report.actual_archiverment;
        },
        set: function (newValue) {
          this.setReportState({name: 'actual_archiverment', value: newValue})
        }
      },
      next_plan: {
        get: function() {
          return this.$store.state.report.report.next_plan;
        },
        set: function (newValue) {
          this.setReportState({name: 'next_plan', value: newValue})
        }
      },
      issues: {
        get: function() {
          return this.$store.state.report.report.issues;
        },
        set: function (newValue) {
          this.setReportState({name: 'issues', value: newValue})
        }
      },
      daily_report: {
        get: function() {
          return this.$store.state.report.report.daily_report;
        },
        set: function (newValue) {
          this.setReportState({name: 'daily_report', value: newValue})
        }
      },
      get: function() {
        return this.$store.state.report.report;
      },
      set: function (newValue) {
        this.setState({name: 'report', value: newValue})
      }
    },
    configs: {
      room_id: {
        get: function() {
          return this.$store.state.report.configs.room_id;
        },
        set: function (newValue) {
          this.setConfigState({name: 'room_id', value: newValue})
        }
      },
      members: {
        get: function() {
          return this.$store.state.report.configs.members;
        },
        set: function (newValue) {
          this.setConfigState({name: 'members', value: newValue})
        }
      },
      selected_members: {
        get: function() {
          return this.$store.state.report.configs.selected_members;
        },
        set: function (newValue) {
          this.setConfigState({name: 'selected_members', value: newValue})
        }
      },
      get: function() {
        return this.$store.state.report.configs;
      },
      set: function (newValue) {
        this.setState({name: 'configs', value: newValue})
      }
    },

    check_allow_edit() {
      return this.selected_date_string == this.today_date_string
    },
    show_members() {
      return this.get_members();
    },
    message_code() {
      return this.setup_message();
    }
  },
  methods: {
    ...mapMutations('report', [
      'setReportState', 'setState', 'setConfigState'
    ]),
    ...mapActions('report', [
      'save', 'fetch_report'
    ]),
    selected_plan(date_string) {
      this.selected_date_string = date_string
      this.prev_date_string = this.$moment(date_string, "DD/MM/YYYY").format("YYYY-MM-DD") + "T00:00:00.000Z"
    },
    to_member_string() {
      var to_list = "";
      var selected_members = this.configs.selected_members[this.configs.room_id] || []
      selected_members.forEach(function(member_id) {
        to_list += `[To:${member_id}]`
      });

      return to_list;
    },
    setup_message() {
      return `${this.to_member_string()}[info][title]${this.report.title} - Daily report ${this.selected_date_string}[/title]1. Today plan
${this.convert_to_an(this.report.today_plan)}
2. Actual archiverment
${this.convert_to_an(this.report.actual_archiverment)}
3. Next plan
${this.convert_to_an(this.report.next_plan)}
4. Issues
${this.convert_to_an(this.report.issues)}
5. Dailly Report
${this.convert_to_an(this.report.daily_report)}
[/info]`;
    },
    get_members() {
      if (this.configs.room_id) {
        var url = `${process.env.ROOT_API}/rooms/${this.configs.room_id}/members`;
        if (!this.configs.members[this.configs.room_id]) {
          this.configs.members[this.configs.room_id] = []
        }
        if (this.configs.members[this.configs.room_id].length <= 0) {
          this.axios.get(url, {params: {token: this.setting.chatwork_token}}).then((res) => {
            if (res.data) {
              this.configs.members[this.configs.room_id] = res.data.map(function(member) {
                // return {account_id: member.account_id, name: member.name, avatar_image_url: member.avatar_image_url}
                return {account_id: member.account_id, name: member.name}
              });
            }
            var room_id = this.configs.room_id
            this.configs.room_id = null
            this.configs.room_id = room_id
          }).catch(e => {
            this.errors.push(e)
          });
        }

        this.$store.commit('report/set_state', {name: 'configs', value: this.configs});
        return this.configs.members[this.configs.room_id];
      }
    },
    get_rooms() {
      var url = `${process.env.ROOT_API}/rooms`;

      return this.axios.get(url, {params: {token: this.setting.chatwork_token}}).then((res) => {
        if (res.data) {
          this.rooms = res.data.map(function(room) {
            return {value: room.room_id.toString(), text: room.name}
          });
        }
      });
    },
    format_text(text) {
      if(!text || text == "")
        return "N/A"
      return text.split('\n').map(function(el) {
        var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/i;
        return el.replace(exp,"<a href='$1' target='_blank'>$1</a>");
      }).join('\n');
    },
    member_is_checked(member) {
      var selected_members = this.configs.selected_members[this.configs.room_id] || []
      return selected_members.includes(member) ? "accepted" : "not_accepted"
    },
    convert_to_an(text) {
      if(!text || text == "")
        return "N/A"
      return text
    },
    copy_to_clipboard(selector) {
      var copyText = document.getElementById(selector);
      copyText.select();
      document.execCommand("copy");
    },
    copy_message() {
      this.copy_to_clipboard("message_code");
      this.$swal({
        type: 'success',
        title: 'Your message code has been copied',
        timer: 2000
      });
    },
    send_message() {
      var url = `${process.env.ROOT_API}/rooms/${this.configs.room_id}/messages`;

      return this.axios.post(url, {token: this.setting.chatwork_token, message: this.setup_message()}).then((res) => {
        if (res.data.errors) {
          this.$swal({
            type: 'error',
            title: 'Oops...',
            text: res.data.errors
          })
        } else {
          this.$swal({
            type: 'success',
            title: 'Sent message success!',
            timer: 2000
          });
        }
      });
    }
  }
}
</script>

<style scoped>
  .vdatetime-input {
    width: 88px !important;
  }

  .vdatetime {
    display: inline-block;
  }

  .main-content {
    border-radius: 3px;
    border: 1px solid #cccccc;
  }

  .report-title {
    background: #f2f2f2;
    border-bottom: 1px solid #cccccc;
    font-size: 15px;
    padding: 2px 10px;
  }

  .report-info {
    padding: 10px 10px;
  }

  .report-info p {
    font-size: 14px;
    padding: 0px 6px;
    white-space: pre;
  }
</style>
