<template>
  <b-col class="content" cols="12">
    <div class="row">
      <div class="col-6">
        <b-form-textarea v-model="string_messages" placeholder="EX: thanks for your support" :rows="20" :max-rows="20" />
      </div>
      <div class="col-6">
        <label for="">Live demo: <b>({{ message_number }}) messages</b></label>
        <b-form-select :options="array_messages" class="mb-3" size="sm" />
      </div>
    </div>
  </b-col>
</template>
<script>
  export default {
    data() {
      return {
        string_messages: null,
        array_messages: [
          "Good job!",
          "Rất hay giúp đỡ mọi người trong team",
          "Thanh niên chăm chỉ nhất team, good job",
          "Rspec rất đỉnh.",
          "Tiếp tục phong độ fix bug và làm task nhé.",
        ]
      }
    },
    created() {
      if (!this.$localStorage.get('messages')) {
        this.$localStorage.set('messages', JSON.stringify(this.array_messages));
      }

      this.array_messages = JSON.parse(this.$localStorage.get('messages'));
      this.string_messages = this.array_messages.join('\n');
    },
    watch: {
      string_messages: function(val) {
        if (val && val != "") {
          this.array_messages = val.trim().split('\n');
          this.$localStorage.set('messages', JSON.stringify(this.array_messages));
        }
      }
    },
    computed: {
      message_number() {
        return this.array_messages.length;
      }
    }
  }
</script>
