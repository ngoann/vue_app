<template>
  <b-col class="content" cols="12">
    <div class="row">
      <div class="col-6">
        <b-form-select v-model="selected" :options="options" class="mb-3" />
        <hr>
        <p>Select users you wanna [TO]</p>
        <div class="">
          <b-form-checkbox id="checkbox1" value="accepted" unchecked-value="not_accepted">
            Nguyen Ngoan
          </b-form-checkbox>
          <b-form-checkbox id="checkbox2" value="accepted" unchecked-value="not_accepted">
            Nguyen Ngoan
          </b-form-checkbox>
        </div>
        <hr>
        <h4>Content</h4>
        <div>
          <b-form-group>
            <b-form-input type="text" placeholder="Title, Ex: NgoanN" v-b-tooltip.hover title="EX: NgoanN"></b-form-input>
          </b-form-group>
        </div>
        <hr>
        <h5>1. Today plan <b-button size="sm" variant="primary">Show</b-button></h5>
        <div class="">
          <b-form-group>
            <b-form-textarea v-model="selected" placeholder="https://dev.framgia.com/issues/18xxx
https://dev.framgia.com/issues/18xxx"
              :rows="2" :max-rows="6">
            </b-form-textarea>
          </b-form-group>
        </div>
        <hr>
        <h5>2. Actual archiverment <b-button size="sm" variant="primary">Show</b-button></h5>
        <div>
          <b-form-group>
            <b-form-textarea v-model="selected" placeholder="https://dev.framgia.com/issues/18xxx | Abcxyz rì đó.
https://dev.framgia.com/issues/18xxx | Abcxyz rì đó."
              :rows="2" :max-rows="6">
            </b-form-textarea>
          </b-form-group>
        </div>
        <hr>
        <h5>3. Next plan <b-button size="sm" variant="primary">Show</b-button></h5>
        <div>
          <b-form-group>
            <b-form-textarea v-model="selected" placeholder="https://dev.framgia.com/issues/18xxx
https://dev.framgia.com/issues/18xxx"
              :rows="2" :max-rows="6">
            </b-form-textarea>
          </b-form-group>
        </div>
        <hr>
        <h5>4. Issues <b-button size="sm" variant="primary">Show</b-button></h5>
        <div>
          <b-form-group>
            <b-form-textarea v-model="selected" placeholder="https://dev.framgia.com/issues/18xxx | Abcxyz rì đó.
https://dev.framgia.com/issues/18xxx | Abcxyz rì đó."
              :rows="2" :max-rows="6">
            </b-form-textarea>
          </b-form-group>
        </div>
        <hr>
        <h5>5. Dailly Report</h5>
        <div class="">
          <b-form-group>
            <b-form-input type="text" placeholder="https://docs.google.com/spreadsheets/d/1xxxxedit#gid=123455"></b-form-input>
            </b-form-textarea>
          </b-form-group>
        </div>
      </div>
      <div class="col-6">
        <label for="">Live demo:</b></label>
      </div>
    </div>
  </b-col>
</template>
<script>
export default {
  data () {
    return {
      setting: {},
      selected: null,
      options: []
    }
  },
  created() {
    if (!this.$localStorage.get('setting')) {
      this.$localStorage.set('setting', JSON.stringify({}));
    }

    this.setting = JSON.parse(this.$localStorage.get('setting'));

    this.get_rooms()
  },
  methods: {
    get_rooms() {
      var url = "https://api.chatwork.com/v2/rooms";
      var options = this.set_options();

      return this.axios.get(url, options).then((response) => {
        debugger
      });
    },
    set_options() {
      return { "headers": { "X-ChatWorkToken": this.setting.chatwork_token } }
    }
  }
}
</script>
