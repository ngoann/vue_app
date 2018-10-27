<template>
    <header class="header-global">
        <base-nav class="navbar-main" transparent type="" effect="light" expand>
            <a slot="brand" class="navbar-brand mr-lg-5" href="#/">
                <img :src="this.$baseUrl('/img/brand/white.png')">
            </a>

            <div class="row" slot="content-header" slot-scope="{closeMenu}">
                <div class="col-6 collapse-brand">
                    <a href="#">
                        <img src="img/brand/blue.png">
                    </a>
                </div>
                <div class="col-6 collapse-close">
                    <close-button @click="closeMenu"></close-button>
                </div>
            </div>

            <ul class="navbar-nav navbar-nav-hover align-items-lg-center">
                <base-dropdown>
                  <a slot="title" href="#/chatwork/report" class="nav-link" data-toggle="dropdown" role="button">
                      <i class="ni ni-ui-04 d-lg-none"></i>
                      <span class="nav-link-inner--text">Daily Report</span>
                  </a>
                </base-dropdown>
                <base-dropdown tag="li" class="nav-item">
                    <a slot="title" href="#" class="nav-link" data-toggle="dropdown" role="button">
                        <i class="ni ni-collection d-lg-none"></i>
                        <span class="nav-link-inner--text">Unipos</span>
                    </a>
                    <router-link to="/unipos/send_point" class="dropdown-item">Send Point</router-link>
                    <router-link to="/unipos/message_management" class="dropdown-item">Message Management</router-link>
                    <router-link to="/unipos/settings" class="dropdown-item">Settings</router-link>
                </base-dropdown>
            </ul>
            <ul class="navbar-nav align-items-lg-center ml-lg-auto">
                <!-- <li class="nav-item">
                    <a class="nav-link nav-link-icon" href="https://www.facebook.com/creativetim" target="_blank"
                       data-toggle="tooltip" title="Like us on Facebook">
                        <i class="fa fa-facebook-square"></i>
                        <span class="nav-link-inner--text d-lg-none">Facebook</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link nav-link-icon" href="https://www.instagram.com/creativetimofficial"
                       target="_blank" data-toggle="tooltip" title="Follow us on Instagram">
                        <i class="fa fa-instagram"></i>
                        <span class="nav-link-inner--text d-lg-none">Instagram</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link nav-link-icon" href="https://twitter.com/creativetim" target="_blank"
                       data-toggle="tooltip" title="Follow us on Twitter">
                        <i class="fa fa-twitter-square"></i>
                        <span class="nav-link-inner--text d-lg-none">Twitter</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link nav-link-icon" href="https://github.com/creativetimofficial/vue-argon-design-system"
                       target="_blank" data-toggle="tooltip" title="Star us on Github">
                        <i class="fa fa-github"></i>
                        <span class="nav-link-inner--text d-lg-none">Github</span>
                    </a>
                </li> -->
                <li class="nav-item d-none d-lg-block ml-lg-4">
                    <a href="#/logout" class="btn btn-neutral btn-icon" v-if="auth">
                      <span class="btn-inner--icon">
                        <i class="ni ni-curved-next mr-2"></i>
                      </span>
                      <span class="nav-link-inner--text">LOGOUT</span>
                    </a>
                    <a href="#/login" class="btn btn-neutral btn-icon" v-else>
                      <span class="btn-inner--icon">
                        <i class="ni ni-curved-next mr-2"></i>
                      </span>
                      <span class="nav-link-inner--text">LOGIN</span>
                    </a>
                </li>
            </ul>
        </base-nav>
    </header>
</template>
<script>
import BaseNav from "@/components/BaseNav";
import BaseDropdown from "@/components/BaseDropdown";
import CloseButton from "@/components/CloseButton";
import { mapState } from 'vuex'

export default {
  components: {
    BaseNav,
    CloseButton,
    BaseDropdown
  },
  computed: {
    ...mapState('authentication', [
      'auth'
    ]),
  }
};
</script>
<style>
</style>
