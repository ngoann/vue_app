<template>
  <div class="row">
    <div class="col-12">
      <card shadow class="" no-body>
        <div class="px-3 py-3">
          <div class="font-weight-bold title badge badge-primary" style="text-transform: unset;">{{ current_project.project.name }}</div>
          <div class="pull-right">
            <base-button block type="primary" class="btn-sm mb-3" @click="add_member_modal.show = true; fetchMembers()">
              <i class="fa fa-plus" aria-hidden="true"></i>
              Add member
            </base-button>
            <modal :show.sync="add_member_modal.show">
              <h6 slot="header" class="modal-title" id="modal-title-default">Select members</h6>
              <h6 v-if="members.length == 0" class="text-center">No members</h6>
              <div class="row">
                <checkbox-member v-for="member in members" :member="member" :key="member.id"
                  @checkedMember="checkedMember" @uncheckedMember="uncheckedMember" />
              </div>
              <template slot="footer">
                <base-button type="primary" size="sm" @click="submitAddmember">Save</base-button>
                <base-button type="link" class="ml-auto" @click="add_member_modal.show = false" size="sm">Close
                </base-button>
              </template>
            </modal>
          </div>
          <hr style="margin-top: 1rem; margin-bottom: 1rem;">
          <div class="list-member row">
            <div class="col-12">
              <div class="font-weight-bold title">Members ({{ current_project.members.length }})</div>
              <div class="row">
                <div class="col-12">
                  <div class="table-responsive">
                    <table class="table table-hover">
                      <tbody>
                        <member v-for="member in current_project.members" :key="member.id" :member="member" :project_id="$route.params.id" />
                      </tbody>
                    </table>
                  </div>
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
  import Member from '@/components/admin/Member'
  import CheckboxMember from '@/components/admin/CheckboxMember'
  import { mapActions, mapState } from 'vuex'
  import Modal from "@/components/Modal.vue";
  export default {
    components: {
      Member, Modal, CheckboxMember
    },
    data() {
      return {
        add_member_modal: {
          show: false
        },
        members: [],
        checked_members: []
      }
    },
    created() {
      this.fetch_project_infor(this.$route.params.id)
    },
    computed: {
      ...mapState('authentication', [
        'current_project', 'token'
      ]),
    },
    watch: {
      current_project: function() {
        this.members = []
        this.fetchMembers()
      }
    },
    methods: {
      ...mapActions('authentication', [
        'fetch_project_infor', 'add_members_into_project'
      ]),
      checkedMember(member_id) {
        var index = this.checked_members.indexOf(member_id)

        if (index == -1) {
          this.checked_members.push(member_id);
        }
      },
      uncheckedMember(member_id) {
        var index = this.checked_members.indexOf(member_id)

        if (index != -1) {
          this.checked_members.splice(index, 1)
        }
      },
      submitAddmember() {
        this.add_members_into_project({project_id: this.current_project.project.id, member_ids: this.checked_members})
      },
      async fetchMembers() {
        if (this.members.length == 0) {
          const res = await this.axios.post(
            process.env.API_SERVER + '/api/admin/users/not_in_project',
            {token: this.token, project_id: this.current_project.project.id}
          )
          if (res.data.status) {
            this.members = res.data.members
          } else {
            this.members = []
          }
        }
      }
    }
  }
</script>
