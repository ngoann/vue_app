<template>
  <b-form-checkbox :id="'id' + member.account_id" v-model="checked"
    value="accepted" unchecked-value="not_accepted" @change="change_checked">
    {{ member.name }}
  </b-form-checkbox>
</template>
<script>
  export default {
    props: ['member', 'checked'],
    methods: {
      change_checked() {
        if (this.checked != "accepted") {
          this.$store.commit('report/set_selected_memebers', this.member.account_id)
        } else {
          this.$store.commit('report/remove_selected_members', this.member.account_id)
        }
      }
    }
  }
</script>
