<template>
  <b-container class="bv-example-row">
    <b-row>
     <b-col cols="12" class="menu">
       <b-button size="sm" variant="primary" href="#/unipos/send_point">
          Send unipos point
       </b-button>
       <b-button size="sm" variant="success" href="#/unipos/message_management">
          <fa-icon icon="messages" /> Message management
       </b-button>
       <b-button size="sm" variant="success" href="#/chatwork/report">
          <fa-icon icon="messages" /> Daily report
       </b-button>
       <b-button size="sm" variant="secondary" href="#/unipos/settings">
          Settings
       </b-button>
     </b-col>
     <router-view/>
   </b-row>
  </b-container>
</template>
<script>
  export default {
  }
</script>
<style scoped>
  .content {
    border-top: 1px solid #c3c3c3;
    padding: 10px 10px;
  }

  .menu {
    background: #f1f1f1;
    padding: 10px 10px;
  }

  .bv-example-row {
    margin-top: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
</style>
