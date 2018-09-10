<template id="goal-template">
  <section class="goal-form">
    <form @submit.prevent="handleSubmit">
      <FormControl label="Name">
        <input type="text" 
          name="name" placeholder="Name" required
          v-model="edit.name">
      </FormControl>

      <FormControl label="description">
        <textarea name="body" rows="8" cols="40" required 
          v-model="edit.description"></textarea>
      </FormControl>
      
      <FormControl>
        <button type="submit">{{ label }}</button>
        <button 
          v-if="onCancel"
          @click="onCancel">
          Cancel
        </button>
      </FormControl>
    </form>
    <pre>{{ error }}</pre>
  </section>
</template>

<script>
import FormControl from './FormControl';
const initGoal = () => {
  return {
    name: '',
    description: ''
  };
};
export default {
  components: {
    FormControl
  },
  props: {
    goal: Object,
    users: Array,
    label: String,
    onEdit: {
      type: Function,
      required: true
    },
    onCancel: Function
  },
  data() {
    return {
      error: null,
      edit: this.goal ? Object.assign({}, this.goal) : initGoal()
    };
  },
  methods: {
    handleSubmit() {
      this.error = null;
      return this.onEdit(this.edit)
        // this fires when save is complete and data added to nieghborhoods array
        .then(() => {
          this.edit = initGoal();
        })
        .catch(err => {
          this.error = err;
        });
    }
  }
};
</script>

<style>
.neighborhood-form {
  width: 300px;
  text-align: left;
}
label {
  display: block;
}
</style>