<template>
  <div class="col-3 project-item" @click="redirect_to_project">
    <div class="content">
      <div class="pin-project">
        <i class="fa fa-thumb-tack" aria-hidden="true"></i>
      </div>
      <div class="project-title font-weight-bold">
        {{ name }}
      </div>
      <div class="project-members">
        <div>{{ member_count }} members</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['name', 'member_count', 'project_id'],
    methods: {
      redirect_to_project() {
        this.$router.push('/admin/project/' + this.project_id)
      }
    }
  };
</script>
<style>
</style>
