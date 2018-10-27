<template>
  <div class="row">
    <div class="col-6">
      <card shadow class="" no-body>
        <div class="px-3 py-3">
          <div class="">
            <div class="text-uppercase font-weight-bold title badge badge-primary">Select room: </div>
            <b-form-select v-model="configs.room_id" :options="rooms" class="mb-3" size="sm" :save="save_draft_report" />
          </div>
          <div class="members" style="margin-bottom: 15px">
            <div class="text-uppercase font-weight-bold title badge badge-warning">Select users you want to [TO]: </div>
            <div class="">
              <User v-for="member in show_members" :member="member" :checked="member_is_checked(member.account_id)" :key="member.account_id + Date.now()" />
            </div>
          </div>
          <div style="border-bottom: 1px solid rgb(72, 0, 139); margin-bottom: 15px;"></div>
          <div class="content">
            <div class="text-uppercase font-weight-bold title badge badge-success">Content:</div>
            <div>
              <b-form-group>
                <b-form-input v-model="report.title" size="sm" placeholder="Please enter the user: NgoanN"
                  :disabled="!check_allow_edit">
                </b-form-input>
              </b-form-group>
            </div>
            <div class="">
              <div class="badge text-uppercase badge-info">1. Today plan</div>
              <div class="">
                <b-form-group>
                  <b-form-textarea v-model="report.today_plan"
                    :rows="1" :max-rows="6" :disabled="!check_allow_edit">
                  </b-form-textarea>
                </b-form-group>
              </div>
            </div>
            <div class="">
              <div class="badge text-uppercase badge-info">2. Actual archiverment</div>
              <div>
                <b-form-group>
                  <b-form-textarea v-model="report.actual_archiverment"
                    :rows="1" :max-rows="6" :disabled="!check_allow_edit">
                  </b-form-textarea>
                </b-form-group>
              </div>
            </div>
            <div class="">
              <div class="badge text-uppercase badge-info">3. Next plan</div>
              <div>
                <b-form-group>
                  <b-form-textarea v-model="report.next_plan"
                    :rows="1" :max-rows="6" :disabled="!check_allow_edit">
                  </b-form-textarea>
                </b-form-group>
              </div>
            </div>
            <div class="">
              <div class="badge text-uppercase badge-info">4. Issues</div>
              <div>
                <b-form-group>
                  <b-form-textarea v-model="report.issues"
                    :rows="1" :max-rows="6" :disabled="!check_allow_edit">
                  </b-form-textarea>
                </b-form-group>
              </div>
            </div>
            <div class="">
              <div class="badge text-uppercase badge-info">5. Dailly Report</div>
              <div class="">
                <b-form-group>
                  <b-form-input type="text" v-model="report.daily_report" :disabled="!check_allow_edit" size="sm"
                    placeholder="https://docs.google.com/spreadsheets/d/1xxxxedit#gid=123455"></b-form-input>
                </b-form-group>
              </div>
            </div>
          </div>
        </div>
      </card>
    </div>
    <div class="col-6">
      <card shadow class="" no-body>
        <div class="px-3 py-3">
          <div class="text-center mt-3 mb-4">
            <datetime type="date" v-model="prev_date_string" :default-value="new Date()" input-class="btn btn-sm btn-secondary" format="dd/MM/yyyy"></datetime>
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
            <div class="report-title" v-html="`${format_text(report.title)} - Daily report ${selected_date_string}`"></div>
            <div class="report-info">
              <h6 style="font-size: 0.91rem;">1. Today plan</h6>
              <p v-html="format_text(report.today_plan)"></p>
              <h6 style="font-size: 0.91rem;">2. Actual archiverment</h6>
              <p v-html="format_text(report.actual_archiverment)"></p>
              <h6 style="font-size: 0.91rem;">3. Next plan</h6>
              <p v-html="format_text(report.next_plan)"></p>
              <h6 style="font-size: 0.91rem;">4. Issues</h6>
              <p v-html="format_text(report.issues)"></p>
              <h6 style="font-size: 0.91rem;">5. Dailly Report</h6>
              <p v-html="format_text(report.daily_report)"></p>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <base-button class="btn-3 btn-block" type="primary" icon="ni ni-bag-17"  @click="send_message">Save and Send</base-button>
            </div>
            <div class="col-6">
              <base-button class="btn-3 btn-block" type="success" icon="ni ni-bag-17"  @click="copy_message">Save and Copy</base-button>
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
  </div>
</template>
<script>
import User from '@/components/chatwork/User'
import { mapGetters, mapState, mapActions, mapMutations } from 'vuex'
import { Datetime } from 'vue-datetime';

export default {
  components: {
    User, Datetime
  },
  data () {
    return {
      report: this.$store.state.report.report,
      selected_date_string: this.$store.state.report.selected_date_string,
      today_date_string: this.$store.state.report.today_date_string,
      prev_date_string: this.$store.state.report.prev_date_string,
      next_date_string: this.$store.state.report.next_date_string,
      setting: {},
      selected: null,
      rooms: [],
      room_id: null,
      members: {},
      configs: this.$store.state.report.configs,
      report: this.$store.state.report.report_nil
    }
  },
  beforeCreate() {
    if(!this.$store.state.authentication.auth) {
      this.$store.commit('authentication/setState', {name: 'back_url', value: this.$router.currentRoute.path})
      this.$router.push('/login')
    }
  },
  watch: {
    prev_date_string: function (val) {
      if (val) {
        this.selected_plan(this.$moment(val).format("DD/MM/YYYY"))
      }
    },
  },
  created() {
    if (!this.$localStorage.get('setting')) {
      this.$localStorage.set('setting', JSON.stringify(this.setting));
    }

    if (!this.$localStorage.get('reports')) {
      this.$localStorage.set('reports', JSON.stringify({}));
    }

    if (!this.$localStorage.get('configs')) {
      this.$localStorage.set('configs', JSON.stringify(this.configs));
    }

    this.setting = JSON.parse(this.$localStorage.get('setting'));
    this.configs = JSON.parse(this.$localStorage.get('configs'));
    this.$store.commit('report/set_state', {name: 'reports', value: JSON.parse(this.$localStorage.get('reports'))})
    this.$store.commit('report/set_state', {name: 'configs', value: this.configs})
    this.report = this.$store.getters['report/current_report']

    this.get_rooms();
  },
  computed: {
    ...mapState('authentication', [
      'auth'
    ]),
    check_allow_edit() {
      return this.$store.state.report.selected_date_string == this.$store.state.report.today_date_string
    },
    show_members() {
      return this.get_members();
    },
    save_draft_report() {
      this.$store.commit('report/set_state', {name: 'report', value: this.report});
    },
    message_code() {
      return this.setup_message();
    }
  },
  methods: {
    selected_plan(date_string) {
      this.$store.commit('report/set_state', {name: 'selected_date_string', value: date_string});
      this.report = this.$store.getters['report/current_report']
      this.$store.commit('report/set_state', {name: 'report', value: this.report});
      this.report = this.$store.getters['report/current_report']
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
      var selected_members = this.$store.state.report.configs.selected_members[this.configs.room_id] || []
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
      this.save_report();

      this.copy_to_clipboard("message_code");
      this.$swal({
        type: 'success',
        title: 'Your message code has been copied',
        timer: 2000
      });
    },
    send_message() {
      this.save_report();

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
    },
    save_report() {
      var url = `${process.env.ROOT_API}/save_report`;
      this.report.date = this.selected_date_string;
      this.axios.post(url, {token: null, report: this.report}).then((res) => {
          //
      }).catch(e => {

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
