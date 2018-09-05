<template id="goal-template">
  <section class="goal-form">
    <form @submit.prevent="handleSubmit">
      <FormControl label="Goal">
        <input type="text" 
          name="goal" placeholder="Goal" required
          v-model="edit.goal">
      </FormControl>

      <FormControl label="Status">
        <input type="text" name="status" placeholder="Status" required
          v-model.number="edit.status">
      </FormControl>

      <FormControl>
        <button type="submit">{{ label }}</button>
      </FormControl>
    </form>
    <pre>{{ error }}</pre>
  </section>
</template>

<script>
import FormControl from './FormControl';

const initGoal = () => {
  return {
    goal: '',
    status: ''
  };
};

export default {
  components: {
    FormControl
  },
  props : {
    goal: Object,
    goals: Array,
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
        .then (() => {
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

</style>