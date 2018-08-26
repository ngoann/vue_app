<template>
  <button type="button" name="button">{{ msg }}</button>
</template>

<script>
export default {
  name: 'Button',
  data () {
    return {
      msg: 'button name'
    }
  }
}
</script>
