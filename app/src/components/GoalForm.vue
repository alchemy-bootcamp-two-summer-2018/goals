<template>
  <section class="goal-form">
    <form @submit.prevent="handleSubmit">
      <FormControl label="Goal">
        <input type="text"
          name="name" placeholder="What's your goal?" required
          v-model="edit.name">
      </FormControl>

      <FormControl>
        <button type="submit">{{ label }}button button</button>
        <button
          v-if="onCancel"
          @click="onCancel">
          Cancel
        </button>
      </FormControl>
    </form>
  </section>
  
</template>

<script>
import FormControl from './FormControl.vue';

const initGoal = () => {
  return {
    name: '',
    completed: false
  };
};

export default {
  components: {
    FormControl
  },
  props: {
    goal: Object,
    onAdd: {
      type: Function,
      required: true
    },
    label: String,
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
      console.log(this.edit);
      return this.onAdd(this.edit)
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

</style>
