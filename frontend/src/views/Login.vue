<template>
    <section class="section section-shaped section-lg my-0" :bind="authenticated">
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
                                <small>Or sign in with credentials</small>
                            </div>
                            <form role="form">
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
                                <base-checkbox v-model="remember">
                                    Remember me
                                </base-checkbox>
                                <div class="text-center">
                                    <base-button type="primary" class="my-4" @click="sign_in_action">Sign In</base-button>
                                </div>
                            </form>
                        </template>
                    </card>
                    <div class="row mt-3">
                      <div class="col-6">
                        <a href="#" class="text-light">
                          <small>Forgot password?</small>
                        </a>
                      </div>
                      <div class="col-6 text-right">
                        <a href="#/register" class="text-light">
                          <small>Create new account</small>
                        </a>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import { mapGetters, mapState, mapActions, mapMutations } from 'vuex'
export default {
  data() {
    return {}
  },
  created() {
    if (this.auth) {
      this.$router.push(this.back_url)
    }
  },
  methods: {
    ...mapActions('authentication', [
      'sign_in'
    ]),
    ...mapMutations('authentication', [
      'setState'
    ]),
    ...mapGetters('authentication', [
      'getUsername', 'getPassword', 'getRemember'
    ]),
    sign_in_action() {
      this.sign_in();
    }
  },
  computed: {
    ...mapState('authentication', [
      'auth', 'username', 'password', 'remember', 'back_url'
    ]),
    authenticated() {
      if (this.auth) {
        this.$router.push(this.back_url)
      }
    },
    remember: {
      get: function() {
        return this.getRemember()
      },
      set: function (newValue) {
        this.setState({name: 'remember', value: newValue})
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
