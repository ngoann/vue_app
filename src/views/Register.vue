<template>
    <section class="section section-shaped section-lg my-0">
        <div class="shape shape-style-1 bg-gradient-default">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div class="container pt-lg-md">
            <div class="row justify-content-center">
                <div class="col-lg-5">
                    <card type="secondary" shadow
                          header-classes="bg-white pb-5"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0">
                        <template>
                            <div class="text-muted text-center mb-3">
                                <small>Sign in with</small>
                            </div>
                            <div class="btn-wrapper text-center">
                                <base-button type="neutral">
                                    <img slot="icon" :src="this.$baseUrl('/img/icons/common/github.svg')">
                                    Github
                                </base-button>

                                <base-button type="neutral">
                                    <img slot="icon" :src="this.$baseUrl('/img/icons/common/google.svg')">
                                    Google
                                </base-button>
                            </div>
                        </template>
                        <template>
                            <div class="text-center text-muted mb-4">
                                <small>Or sign up with credentials</small>
                            </div>
                            <form role="form">
                                <base-input alternative v-model="name"
                                            class="mb-3"
                                            placeholder="Name (EX: NgoanN)"
                                            addon-left-icon="ni ni-hat-3">
                                </base-input>
                                <base-input alternative v-model="username"
                                            class="mb-3"
                                            placeholder="Username"
                                            addon-left-icon="ni ni-email-83">
                                </base-input>
                                <base-input alternative v-model="password"
                                            type="password"
                                            placeholder="Password"
                                            addon-left-icon="ni ni-lock-circle-open">
                                </base-input>
                                <div class="text-muted font-italic">
                                    <small>password strength:
                                        <span class="text-success font-weight-700">strong</span>
                                    </small>
                                </div>
                                <div class="text-center">
                                    <base-button type="primary" class="my-4" @click="sign_up_action">Create account</base-button>
                                </div>
                            </form>
                        </template>
                    </card>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import { mapGetters, mapState, mapActions, mapMutations } from 'vuex'

export default {
  data() {
    return {
    }
  },
  created() {
    this.$store.dispatch('authentication/authenticate_token');
    this.authenticated();
  },
  methods: {
    ...mapActions('authentication', [
      'sign_up'
    ]),
    ...mapMutations('authentication', [
      'setState'
    ]),
    ...mapGetters('authentication', [
      'getUsername', 'getPassword', 'getName'
    ]),
    sign_up_action() {
      this.sign_up();
      this.authenticated();
    },
    authenticated() {
      if (this.auth) {
        this.$router.push('/')
      }
    }
  },
  computed: {
    ...mapState('authentication', [
      'auth', 'username', 'password', 'name'
    ]),

    name: {
      get: function() {
        return this.getName()
      },
      set: function (newValue) {
        this.setState({name: 'name', value: newValue})
      }
    },
    username: {
      get: function() {
        return this.getUsername()
      },
      set: function (newValue) {
        this.setState({name: 'username', value: newValue})
      }
    },
    password: {
      get: function() {
        return this.getPassword()
      },
      set: function (newValue) {
        this.setState({name: 'password', value: newValue})
      }
    }
  }
};
</script>
<style>
</style>
