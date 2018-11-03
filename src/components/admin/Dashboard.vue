<template>
  <div class="row">
    <div class="col-12">
      <card shadow class="" no-body>
        <div class="px-3 py-3">
          <div class="text-uppercase font-weight-bold title badge badge-primary">List project:</div>
          <div class="list-project row">
            <project-item v-for="project in projects" :name="project.name" :member_count="project.member_count" :project_id="project.id" :key="project.id"/>
            <div class="col-3 project-item">
              <div class="form-new-content bg-primary" v-if="new_project">
                <input type="text" v-model="project_name" class="font-weight-bold" placeholder="Add the project name"
                  ref="projectNameInput">
                <div class="project-actions text-right">
                  <a class="bg-success" @click="create_project_action()">Add</a>
                  <a class="bg-secondary" style="color: #525f7f" @click="set_new_project(false)">Cancel</a>
                </div>
              </div>
              <div class="new-content text-center" v-else @click="set_new_project(true)">
                <span>Create a new project...</span>
              </div>
            </div>
          </div>
        </div>
      </card>
    </div>
  </div>
</template>
<script>
  import ProjectItem from '@/components/admin/ProjectItem'
  import { mapState, mapActions } from 'vuex'

  export default {
    components: {
      ProjectItem
    },
    data() {
      return {
        new_project: false,
        project_name: null
      }
    },
    created() {
      this.fetch_projects()
    },
    updated() {
      if (this.new_project == true) {
        this.$refs.projectNameInput.focus()
      }
    },
    computed: {
      ...mapState('authentication', [
        'projects'
      ]),
    },
    methods: {
      ...mapActions('authentication', [
        'fetch_projects', 'create_project'
      ]),
      set_new_project(val) {
        this.new_project = val
      },
      create_project_action() {
        if (this.project_name) {
          this.create_project(this.project_name)
          this.set_new_project(false)
        } else {
          this.$refs.projectNameInput.focus()
        }
      }
    }
  }
</script>
<style>
  ::placeholder {
    color: #fff;
    opacity: 1;
  }
</style>
