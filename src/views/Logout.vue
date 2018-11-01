<template>

</template>
<script>
import { mapMutations, mapActions } from 'vuex'
export default {
  data() {
    return {
    }
  },
  created() {
    this.logout()
    this.reset_reports()
    this.$router.push('/login')
  },
  methods: {
    ...mapMutations('authentication', [
      'setState'
    ]),
    ...mapActions('authentication', [
      'logout'
    ]),
    ...mapActions('report', [
      'reset_reports'
    ])
  }
};
</script>
<style>
</style>
