<template>
  <b-form-checkbox :id="'id' + i_member.account_id" v-model="member_value"
    value="accepted" unchecked-value="not_accepted" @change="change_checked">
    {{ i_member.name }}
  </b-form-checkbox>
</template>
<script>
  export default {
    props: ['member', 'checked'],
    data() {
      return {
        member_value: this.checked,
        i_member: this.member
      }
    },
    computed: {

    },
    methods: {
      change_checked() {
        if (this.member_value != "accepted") {
          this.$emit('changeToMember', "accepted", this.i_member);
        } else {
          this.$emit('changeToMember', "not_accepted", this.i_member);
        }
      }
    }
  }
</script>
