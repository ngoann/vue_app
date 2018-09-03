<template>
  <div class="row">
    <div class="col-3">
      <b-input-group size="sm" class="mb-3">
        <b-form-input placeholder="Ex: nguyen.ngoan"
          v-b-tooltip.hover title="Enter the username"
          v-model="i_user.username" />
        <b-input-group-append>
          <b-btn size="sm" variant="outline-success" v-if="f_check_user">
            <fa-icon icon="check" />
          </b-btn>
          <b-btn size="sm" variant="outline-danger" v-else>
            <fa-icon icon="times" />
          </b-btn>
        </b-input-group-append>
      </b-input-group>
    </div>
    <div class="col-2">
      <b-form-select v-model="i_user.hash_tag" :disabled="!f_check_user" :options="i_hash_tags" class="mb-3" size="sm" />
    </div>
    <div class="col-3">
      <b-form-select v-model="i_user.message" :disabled="!f_check_user" :options="i_messages" class="mb-3" size="sm" />
    </div>
    <div class="col-2">
      <b-form-input type="number" size="sm" :disabled="!f_check_user"
        v-model="i_user.point" value="0"
        v-b-tooltip.hover title="Enter points you wanna send!">
      </b-form-input>
    </div>
    <div class="col-2">
      <b-button size="sm" variant="outline-success" v-b-tooltip.hover title="Save!" @click="save" id="btn-save">
        <fa-icon icon="save" />
      </b-button>
      <b-button size="sm" variant="outline-primary"
        v-b-tooltip.hover title="Send!"
        :disabled="!check_allow_save"
        @click="m_send" id="btn-send"
      >
        <fa-icon icon="play" />
      </b-button>
      <b-button size="sm" variant="outline-danger" v-b-tooltip.hover title="Remove!" @click="remove">
         <fa-icon icon="times" />
      </b-button>
      <span v-if="show_alert"><b style="color: green">OK</b></span>
    </div>
  </div>
</template>
<script>
import AlertTimeOut from '@/components/AlertTimeOut'
  export default {
    props: ['user', 'hash_tags', 'messages', 'index'],
    components: {
      AlertTimeOut
    },
    data () {
      return {
        dismissCountDown: 3,
        show_alert: false,
        saving: false,
        check_user: this.user.username ? true : false,
        i_messages: this.messages,
        i_hash_tags: this.hash_tags,
        i_index: this.index,
        i_user: {
          username: this.user.username,
          message: this.user.message || "Auto",
          hash_tag: this.user.hash_tag,
          point: this.user.point,
          unipos_id: this.user.unipos_id,
        }
      }
    },
    computed: {
      check_allow_save() {
        if (!this.f_check_user || !this.i_user.unipos_id || !this.i_user.message || !this.i_user.hash_tag || !this.i_user.point || parseInt(this.i_user.point) < 0) {
          return false;
        }
        return true;
      },
      f_check_user() {
        if (!this.i_user.username || this.i_user.username == "") {
          return false;
        }
        var setting = JSON.parse(this.$localStorage.get('setting'));
        var url = "https://unipos.me/q/jsonrpc";
        var data = {
          "jsonrpc":"2.0",
          "method":"Unipos.FindSuggestMembers",
          "params":{"term": this.i_user.username,"limit":1},
          "id":"Unipos.FindSuggestMembers"
        };
        var options = {
          "headers": {
            "x-unipos-token": setting.unipos_token,
            "Content-Type": "application/json"
          }
        };
        this.axios.post(url, data, options).then((res) => {
          if (res.data.result && res.data.result.length > 0) {
            this.i_user.unipos_id = res.data.result[0].id;
            this.check_user = true
          } else {
            this.i_user.unipos_id = null;
            this.check_user = false
          }
        });

        return this.check_user;
      }
    },
    methods: {
      countDownChanged (dismissCountDown) {
        this.dismissCountDown = dismissCountDown
      },
      save() {
        let old_html = this.$el.querySelector('#btn-save').innerHTML;
        this.$el.querySelector('#btn-save').innerHTML = '...';
        var users = JSON.parse(this.$localStorage.get('users'));

        if (users[this.i_index]) {
          users[this.i_index] = this.i_user
        } else {
          users.push(this.i_user)
        }

        this.$localStorage.set('users', JSON.stringify(users));
        this.$el.querySelector('#btn-save').innerHTML = old_html;
        this.show_alert = true;
      },
      remove() {
        var users = JSON.parse(this.$localStorage.get('users'));

        if (users[this.i_index]) {
          users.splice(this.i_index, 1);
        }
        this.$localStorage.set('users', JSON.stringify(users));
        this.$emit('show-changed');
      },
      m_send() {
        this.send_point();
      },
      send_point() {
        if (!this.check_allow_save) {
          return false;
        }
        var btn_send = this.$el.querySelector('#btn-send');
        let old_html = btn_send.innerHTML;
        btn_send.setAttribute('disabled', true);
        btn_send.innerHTML = '...';

        var setting = JSON.parse(this.$localStorage.get('setting'));
        var url = "https://unipos.me/c/jsonrpc";
        var user_message = "";
        if (this.i_user.message == "Auto") {
          user_message = this.messages[Math.floor(Math.random() * this.messages.length)];
        } else {
          user_message = this.i_user.message;
        }
        var message = `${this.i_user.hash_tag} ${user_message}`;
        var data = {
          "jsonrpc":"2.0",
          "method":"Unipos.SendCard",
          "params":{
            "from_member_id": setting.unipos_id,
            "to_member_id": this.i_user.unipos_id,
            "point": parseInt(this.i_user.point),
            "message": message
          },
          "id":"Unipos.SendCard"
        };
        var options = {
          "headers": {
            "x-unipos-token": setting.unipos_token,
            "Content-Type": "application/json"
          }
        };

        return this.axios.post(url, data, options).then((response) => {
          btn_send.innerHTML = old_html;
          btn_send.removeAttribute('disabled');

          if(response.error) {
            return false;
          }

          if(response.result) {
            return true;
          }
        });
      }
    }
  }
</script>
