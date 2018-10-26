<template>
    <div id="app">
        <AppHeader />
        <main>
            <fade-transition origin="center" mode="out-in" :duration="250">
                <router-view/>
            </fade-transition>
        </main>
        <router-view name="footer"></router-view>
    </div>
</template>
<script>
import { FadeTransition } from "vue2-transitions";
import AppHeader from "./layout/AppHeader";

export default {
  components: {
    FadeTransition, AppHeader
  }
};
</script>
