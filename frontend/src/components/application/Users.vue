<template>
  <div class="">
    <User v-for="member in members_value" :member="member" />
  </div>
</template>
<script>
  import User from '@/components/chatwork/User'

  export default {
    props: ['members'],
    components: {
      User
    },
    data() {
      return {
        members_value: this.members,
      }
    }
  }
</script>
