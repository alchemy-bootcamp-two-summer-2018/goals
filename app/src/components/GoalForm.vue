<template id="goal-template">
  <section class="goal-form">
    <form @submit.prevent="handleSubmit">
      <FormControl label="Description">
        <input type="text" 
          name="description" placeholder="Description" required
          v-model="edit.description">
      </FormControl>

      <!-- <FormControl label="Completed">
        <input type="text" name="completed" placeholder="Completed" required
          v-model.number="edit.completed">
      </FormControl> -->
      
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
    description: '',
    completed: false
    // userId: ''
  };
};
export default {
  components: {
    FormControl
  },
  props: {
    goal: Object,
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
.goal-form {
  width: 300px;
  text-align: left;
}
label {
  display: block;
}
</style>