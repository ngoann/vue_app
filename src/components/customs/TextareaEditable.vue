<template>
  <div class="main-textareaHTML">
    <span class="status-editing badge text-uppercase badge-success" v-if="editable">Editing</span>
    <span class="status-edit badge text-uppercase badge-info" v-else
      v-html="!this.disabled ? 'Click to Edit' : 'Can not edit'">Click to Edit</span>
    <textarea ref="textareaHTML" id="textareaHTML" :value="value" @input="updateData()" v-if="editable"
    class="textarea-editable" @focusout="disable_edit" :disabled="disabled" :style="{ height: height + 'px' }"></textarea>
    <p class="contentHTML" ref="contentHTML" v-else @click="enable_edit" v-html="format_text(value)"></p>
  </div>
</template>
<script>
export default {
  props: ['value', 'disabled'],
  data() {
    return {
      editable: false,
      height: 0,
    }
  },
  updated() {
    if (this.$refs.textareaHTML) {
      this.$refs.textareaHTML.focus();
    }
  },
  methods: {
    updateData() {
      this.height = this.$refs.textareaHTML.scrollHeight
      this.$emit('input', this.$refs.textareaHTML.value)
    },
    enable_edit() {
      if (!this.disabled) {
        this.height = this.$refs.contentHTML.offsetHeight
        this.editable = true
      }
    },
    disable_edit() {
      this.editable = false
    },
    format_text(text) {
      if(!text || text == "")
        return "N/A"
      return text.split('\n').map(function(el) {
        var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/i;
        return el.replace(exp,"<a href='$1' target='_blank'>$1</a>");
      }).join('\n');
    },
  }
};
</script>
<style>
  .main-textareaHTML {
    position: relative;
  }

  .main-textareaHTML .status-editing {
    position: absolute;
    right: 0;
    top: 0;
  }

  .main-textareaHTML .status-edit {
    position: absolute;
    right: 0;
    top: 0;
    display: none;
  }

  .main-textareaHTML:hover .status-edit {
    display: inline-block;
  }

  .textarea-editable {
    width:100%;
  	box-sizing:border-box;
  	max-width:100%;
  	padding: 0 6px;
  	border:1px dotted;
  	transition:box-shadow 0.5s ease;
  	box-shadow:0 4px 6px rgba(0,0,0,0.1);
  	font-smoothing:subpixel-antialiased;
    font-size: 14px;
    background: #f2f2f2;
    outline: none;
    font-weight: 300;
    line-height: 1.7;
    margin-bottom: 1rem;
    color: #32325d;
  }

  ::-webkit-scrollbar {
    display: none;
  }

  .contentHTML {
    cursor: pointer;
    font-size: 14px;
    padding: 0 6px;
    white-space: pre;
    border: 1px solid #fff;
  }

  .contentHTML:hover {
    background: #f2f2f2;
    border: 1px dotted;
  }
</style>
