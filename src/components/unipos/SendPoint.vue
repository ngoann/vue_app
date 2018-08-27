<template>
  <b-col class="content" cols="12">
    <Item v-for="(user, index) in users"
      :user="user" :hash_tags="hash_tags"
      :messages="messages" :index="index"
      ref="items"
    ></Item>
    <div class="row">
      <div class="col-9">
        <b-button size="sm" variant="success" v-b-tooltip.hover title="Add new user!" @click="add_user">
          <fa-icon icon="save" />
        </b-button>
      </div>
      <div class="col-3">
        <b-button size="sm" variant="success" v-b-tooltip.hover title="Save all user!" @click="save_all">
          <fa-icon icon="save" /> Save all
        </b-button>
        <b-button size="sm" variant="primary" v-b-tooltip.hover title="Send point to all user!">
          <fa-icon icon="play" /> Send all
        </b-button>
      </div>
    </div>
  </b-col>
</template>
<script>
  import Item from '@/components/unipos/Item'
  export default {
    data () {
      return {
        users: [],
        hash_tags: [
          {value: "#1.AppreciateTeamwork", text: "#1.AppreciateTeamwork"},
          {value: "#2.ThinkOutsideTheBox", text: "#2.ThinkOutsideTheBox"},
          {value: "#3.HaveTheGutsToChallenge", text: "#3.HaveTheGutsToChallenge"},
          {value: "#4.ThinkPositive", text: "#4.ThinkPositive"},
          {value: "#5.SpeedUp", text: "#5.SpeedUp"},
          {value: "#6.BeProfessional", text: "#6.BeProfessional"},
          {value: "#7.FocusOnThePoint", text: "#7.FocusOnThePoint"}
        ],
        messages: []
      }
    },
    components: {
      Item
    },
    created() {
      if (!this.$localStorage.get('users')) {
        this.$localStorage.set('users', JSON.stringify([]));
      }

      if (!this.$localStorage.get('messages')) {
        this.$localStorage.set('messages', JSON.stringify([]));
      }

      this.users = JSON.parse(this.$localStorage.get('users'));
      this.messages = JSON.parse(this.$localStorage.get('messages'));
    },
    methods: {
      add_user() {
        this.users.push({});
      },
      save_all() {
        this.$refs.items.forEach(function(item) {
          item.save();
        });
      }
    }
  }
</script>
