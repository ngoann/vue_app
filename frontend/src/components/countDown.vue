<template>
  <a href="#" >a</a>
</template>
<script>
  export default {
    data() {
      return {
        show: false
      }
    },
    methods: {
      sayHi: function () {
        this.$emit('welcome')
      }
    }
  }
</script>
