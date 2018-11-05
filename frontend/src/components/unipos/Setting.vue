<template>
  <b-col class="content" cols="12" :bind_data="f_setting">
    <div class="row">
      <div class="col-6">
        <label for="">Your unipos token:</label>
        <b-form-input v-model="setting.unipos_token" type="text" size="sm" placeholder="Your unipos token"></b-form-input>
      </div>
      <div class="col-6">
        <label for="">Your unipos ID</label>
        <b-form-input v-model="setting.unipos_id" type="text" size="sm" placeholder="Your unipos ID"></b-form-input>
      </div>
    </div>
    <hr>
    <div class="row">
      <div class="col-6">
        <label for="">Your chatwork token</label>
        <b-form-input v-model="setting.chatwork_token" type="text" size="sm" placeholder="Your chatwork token"></b-form-input>
      </div>
    </div>
  </b-col>
</template>
<script>
  export default {
    data() {
      return {
        setting: {},
      }
    },
    created() {
      if (!this.$localStorage.get('setting')) {
        this.$localStorage.set('setting', JSON.stringify({}));
      }

      this.setting = JSON.parse(this.$localStorage.get('setting'));
    },
    computed: {
      f_setting() {
        this.$localStorage.set('setting', JSON.stringify(this.setting));
      }
    }
  }
</script>
