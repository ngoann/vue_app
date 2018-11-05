<template>
  <div class="row">
    <div class="col-12">
      <card shadow class="" no-body>
        <div class="px-3 py-3">
          <div class="font-weight-bold title badge badge-primary">enFIT</div>
          <div class="pull-right">
            <input type="text" class="input-search-member" :size="sm">
            <button class="btn btn-primary btn-sm">
              <i class="fa fa-plus" aria-hidden="true"></i>
              Add member
            </button>
          </div>
          <hr style="margin-top: 1rem; margin-bottom: 1rem;">
          <div class="list-member row">
            <div class="col-12">
              <div class="font-weight-bold title">Members(12)</div>
              <div class="row">
                <div class="col-12">
                  <table class="table table-hover">
                    <tbody>
                      <member />
                      <member />
                      <member />
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </card>
    </div>
  </div>
</template>
<script>
  import { Datetime } from 'vue-datetime';
  import Member from '@/components/admin/Member'

  export default {
    components: {
      Member
    },
    data() {
      return {
        new_project: false
      }
    },
    updated() {
      if (this.new_project == true) {
        this.$refs.projectNameInput.focus();
      }
    },
    methods: {
      set_new_project(val) {
        this.new_project = val
      }
    }
  }
</script>
