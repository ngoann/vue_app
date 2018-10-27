<template>

</template>
<script>
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
    }
  },
  created() {
    this.$localStorage.set('report_app_token', '')
    this.setState({name: 'auth', value: false})
    this.$router.push('/login')
  },
  methods: {
    ...mapMutations('authentication', [
      'setState'
    ])
  }
};
</script>
<style>
</style>
