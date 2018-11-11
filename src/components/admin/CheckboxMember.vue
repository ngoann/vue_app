<template>
  <div class="col-md-4 col-sm-12 mb-3">
    <b-form-checkbox :id="'id' + member.id" value="accepted" unchecked-value="not_accepted" v-model="checked" @change="change_checked()">
      <span>{{ member.name }}</span>
    </b-form-checkbox>
  </div>
</template>
<script>
  export default {
    props: ['member'],
    data() {
      return {
        checked: false
      }
    },
    methods: {
      change_checked() {
        if (this.checked != "accepted") {
          this.$emit('checkedMember', this.member.id)
        } else {
          this.$emit('uncheckedMember', this.member.id)
        }
      }
    }
  };
</script>
<style>
</style>
