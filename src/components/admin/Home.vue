<template>
  <div class="profile-page">
    <section class="section-profile-cover section-shaped my-0">
      <div class="shape shape-style-1 shape-primary shape-skew alpha-4">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </section>
    <section class="section section-skew">
      <div class="container">
        <div class="card-profile mt--500" no-body>
          <fade-transition origin="center" mode="out-in" :duration="200">
            <router-view />
          </fade-transition>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  import { mapMutations } from 'vuex'
  import { FadeTransition } from "vue2-transitions";

  export default {
    components: {
      FadeTransition
    },
    created() {
      if(!this.$store.state.authentication.admin) {
        this.setState({name: 'messages', value: {type: 'error', message: 'Access denied!'}})
        this.$router.push('/')
      }
    },
    methods: {
      ...mapMutations('authentication', [
        'setState'
      ]),
    }
  };
</script>
<style>
</style>
