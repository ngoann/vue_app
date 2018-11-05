<template>
  <div id="app">
    <AppHeader />
    <main>
      <fade-transition origin="center" mode="out-in" :duration="200">
        <router-view/>
      </fade-transition>
    </main>
    <router-view name="footer"></router-view>
  </div>
</template>
<script>
import { FadeTransition } from "vue2-transitions";
import AppHeader from "./layout/AppHeader";
import { mapGetters, mapState, mapActions, mapMutations } from 'vuex'

export default {
  components: {
    FadeTransition, AppHeader
  },
  created() {
    this.$store.dispatch('authentication/authenticate_token');
  },
  watch: {
    messages: function() {
      this.$message({
        message: this.messages.message,
        type: this.messages.type,
        showClose: true
      })
    }
  },
  computed: {
    ...mapState('authentication', [
      'messages'
    ]),
  }
};
</script>
