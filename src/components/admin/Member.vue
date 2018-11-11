<template>
  <tr>
    <td><a href="#"><i>{{ member.name }}</i></a></td>
    <td><span style="cursor: pointer" data-toggle="tooltip" title="Day join project">{{ member.created_at }}</span></td>
    <td><button class="btn btn-secondary btn-sm">Today report</button></td>
    <td>
      <select class="select-custom" name="" v-model="export_time">
        <option value="">Select time to download</option>
        <option value="1">Last 1 week</option>
        <option value="2">Last 1 month</option>
        <option value="3">Last 3 month</option>
        <option value="4">Last 6 month</option>
        <option value="5">Last 12 month</option>
        <option value="6">All</option>
      </select>
    </td>
    <td class="text-right">
      <download-excel :fetch="fetchData" :name="export_csv_name()" type="csv" class="display-inblock">
        <button class="btn btn-success btn-sm" :disabled="export_time == ''">Download CSV</button>
      </download-excel>
      <button class="btn btn-danger btn-sm" @click="remove">Remove</button>
    </td>
  </tr>
</template>
<script>
  import { mapGetters, mapState, mapActions, mapMutations } from 'vuex'

  export default {
    props: ['member', 'project_id'],
    data() {
      return {
        export_time: "",
        start_date: null,
        end_date: this.$moment().format("YYYY-MM-DD")
      }
    },
    watch: {
      export_time: function(val) {
        switch (val) {
          case "1":
            this.start_date = this.$moment().weekday(-7).format("YYYY-MM-DD")
            break;
          case "2":
            this.start_date = this.$moment().subtract(1, 'months').startOf('month').format("YYYY-MM-DD")
            break;
          case "3":
            this.start_date = this.$moment().subtract(3, 'months').startOf('month').format("YYYY-MM-DD")
            break;
          case "4":
            this.start_date = this.$moment().subtract(6, 'months').startOf('month').format("YYYY-MM-DD")
            break;
          case "5":
            this.start_date = this.$moment().subtract(12, 'months').startOf('month').format("YYYY-MM-DD")
            break;
          case "6":
            this.start_date = this.$moment().subtract(100, 'months').startOf('month').format("YYYY-MM-DD")
            break;
        }
      }
    },
    methods: {
      ...mapActions('report', [
        'fetch_report_from'
      ]),
      async fetchData() {
        const response = await this.axios.post(
          process.env.API_SERVER + '/api/reports/export_csv',
          {start_date: this.start_date, end_date: this.end_date, project_id: this.project_id, token: this.member.token}
        )
        if (response.data.reports.length < 1) {
          this.$store.commit('authentication/setMessage', {type: 'info', message: 'This member has no reports!'})
        }
        return response.data.reports
      },
      remove() {
      },
      export_csv_name() {
        return `${this.member.name}_${this.$moment(this.start_date, "YYYY-MM-DD").format("DD/MM/YYYY")}-${this.$moment(this.end_date, "YYYY-MM-DD").format("DD/MM/YYYY")}.csv`
      },
    }
  };
</script>
<style>
</style>
