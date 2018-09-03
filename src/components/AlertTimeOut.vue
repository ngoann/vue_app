<template>
  <span v-if="i_show"><b style="color: green">OK</b></span>
</template>
<script>
  export default {
    props:['show', 'dismissTime'],
    data() {
      return {
        i_show: this.show || false
      }
    },
    created() {
      this.count_down();
    },
    methods: {
      count_down() {
        var dismissTime = parseInt(this.dismissTime);
        var _this = this;

        if (dismissTime > 0) {
          _this.i_show = true

          setInterval(function () {
            if (dismissTime == 0) {
              _this.i_show = false
              _this.$emit('dismissed');
              _this.$emit('input', false);
              return;
            }
            dismissTime--;
            _this.$emit('count-down', dismissTime);
            _this.$emit('input', dismissTime);
          }, 1000);
        }
      }
    }
  }
</script>
