<template>
  <b-col class="content" cols="12">
    <div class="row">
      <div class="col-6">
        <b-form-select v-model="report.room_id" :options="rooms" class="mb-3" :args="show_members" :save="save_report" />
        <hr>
        <p>Select users you wanna [TO] </p>
        <div class="">
          <User v-for="member in members" :member="member" :checked="member_is_checked(member.account_id)" @changeToMember="change_to_member" />
        </div>
        <hr>
        <h4>Content</h4>
        <div>
          <b-form-group>
            <b-form-input type="text" v-model="report.title" placeholder="Title, Ex: NgoanN" v-b-tooltip.hover title="EX: NgoanN"></b-form-input>
          </b-form-group>
        </div>
        <hr>
        <h5>1. Today plan <b-button size="sm" variant="primary">Show</b-button></h5>
        <div class="">
          <b-form-group>
            <b-form-textarea v-model="report.today_plan" placeholder="https://dev.framgia.com/issues/18xxx | Abc..."
              :rows="2" :max-rows="6">
            </b-form-textarea>
          </b-form-group>
        </div>
        <hr>
        <h5>2. Actual archiverment <b-button size="sm" variant="primary">Show</b-button></h5>
        <div>
          <b-form-group>
            <b-form-textarea v-model="report.actual_archiverment" placeholder="https://dev.framgia.com/issues/18xxx | Abc..."
              :rows="2" :max-rows="6">
            </b-form-textarea>
          </b-form-group>
        </div>
        <hr>
        <h5>3. Next plan <b-button size="sm" variant="primary">Show</b-button></h5>
        <div>
          <b-form-group>
            <b-form-textarea v-model="report.next_plan" placeholder="https://dev.framgia.com/issues/18xxx | Abc..."
              :rows="2" :max-rows="6">
            </b-form-textarea>
          </b-form-group>
        </div>
        <hr>
        <h5>4. Issues <b-button size="sm" variant="primary">Show</b-button></h5>
        <div>
          <b-form-group>
            <b-form-textarea v-model="report.issues" placeholder="https://dev.framgia.com/issues/18xxx | Abc..."
              :rows="2" :max-rows="6">
            </b-form-textarea>
          </b-form-group>
        </div>
        <hr>
        <h5>5. Dailly Report</h5>
        <div class="">
          <b-form-group>
            <b-form-input type="text" v-model="report.daily_report" placeholder="https://docs.google.com/spreadsheets/d/1xxxxedit#gid=123455"></b-form-input>
          </b-form-group>
        </div>
      </div>
      <div class="col-6">
        <label for=""><b>Live demo:</b></label>
        <p class="">
        </p>
        <p>{{ to_member_string() }}</p>
        <div class="main-content">
          <div class="report-title" v-html="format_text(report.title)"></div>
          <div class="report-info">
            <h6>1. Today plan</h6>
            <p v-html="format_text(report.today_plan)"></p>
            <h6>2. Actual archiverment</h6>
            <p v-html="format_text(report.actual_archiverment)"></p>
            <h6>3. Next plan</h6>
            <p v-html="format_text(report.next_plan)"></p>
            <h6>4. Issues</h6>
            <p v-html="format_text(report.issues)"></p>
            <h6>5. Dailly Report</h6>
            <p v-html="format_text(report.daily_report)"></p>
          </div>
        </div>
        <hr>
        <div class="">
          <b-button size="sm" variant="primary"  @click="send_message">
            <fa-icon icon="messages" /> Send
          </b-button>
          <b-button size="sm" variant="default" @click="copy_message">
            <fa-icon icon="messages" /> Copy
          </b-button>
        </div>
        <div style="opacity: 0; height: 0px">
          <b-form-group>
            <b-form-textarea id="message_code" readonly :value="message_code" :rows="2" :max-rows="6">
            </b-form-textarea>
          </b-form-group>
        </div>
      </div>
    </div>
  </b-col>
</template>

<style scoped>
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

<script>
import User from '@/components/chatwork/User'

export default {
  components: {
    User
  },
  data () {
    return {
      setting: {},
      selected: null,
      rooms: [],
      room_id: null,
      members: [],
      report: {
        room_id: null,
        members: {},
        title: null,
        today_plan: null,
        actual_archiverment: null,
        next_plan: null,
        issues: null,
        daily_report: null
      }
    }
  },
  created() {
    this.report.members = {}
    if (!this.$localStorage.get('setting')) {
      this.$localStorage.set('setting', JSON.stringify({}));
    }

    if (!this.$localStorage.get('report')) {
      this.$localStorage.set('report', JSON.stringify({}));
    }

    this.setting = JSON.parse(this.$localStorage.get('setting'));
    this.report = JSON.parse(this.$localStorage.get('report'));
    if (!this.report.members) {
      this.report.members = {}
    }
    this.get_rooms();
  },
  computed: {
    show_members() {
      if (!this.report.members[this.report.room_id]) {
        this.report.members[this.report.room_id] = [];
      }
      this.get_members();
    },
    save_report() {
      this.$localStorage.set('report', JSON.stringify(this.report));
    },
    message_code() {
      return this.setup_message();
    }
  },
  methods: {
    to_member_string() {
      var to_list = "";

      this.report.members[this.report.room_id].forEach(function(member_id) {
        to_list += `[To:${member_id}]`
      });

      return to_list;
    },
    setup_message() {
      return `${this.to_member_string()}[info][title]${this.report.title}[/title]1. Today plan
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
      if (this.report.room_id) {
        var url = `/rooms/${this.report.room_id}/members`;
        this.members = [];
        this.axios.get(url, {params: {token: this.setting.chatwork_token}}).then((res) => {
          if (res.data) {
            this.members = res.data.map(function(member) {
              return {account_id: member.account_id, name: member.name, avatar_image_url: member.avatar_image_url}
            });
          }
          this.$forceUpdate()
        }).catch(e => {
          this.errors.push(e)
        });
      }
    },
    get_rooms() {
      var url = "/rooms";

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
        return el.replace(exp,"<a href='$1'>$1</a>");
      }).join('\n');
    },
    change_to_member(status, member) {
      var index = this.report.members[this.report.room_id].indexOf(member.account_id);
      if (status == "accepted" && index == -1) {
        this.report.members[this.report.room_id].push(member.account_id);
      } else {
        if (index != -1) {
          this.report.members[this.report.room_id].splice(index, 1);
        }
      }

      // this.report.members = {}
      this.$localStorage.set('report', JSON.stringify(this.report));
    },
    member_is_checked(member_id) {
      return this.report.members[this.report.room_id].includes(member_id) ? "accepted" : "not_accepted"
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
      var url = `/rooms/${this.report.room_id}/messages`;

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
