<template id="goal-template">
  <section class="goal-form">
    <form @submit.prevent="handleSubmit">

      <FormControl label="Description">
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
    description: '',
    completed: false,
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

textarea {
  background: var(--lightbacon);
  border-radius: 15px 15px;
  padding: 15px;
}

button {
  background: var(--lightbacon);
  padding: 6px;
  border-radius: 8px 8px;
  font-size: 16px;
}

button:hover {
  background: var(--darkbacon);
  cursor: pointer;
}

.goal-form {
  width: 300px;
  text-align: left;
}

label {
  display: block;
}

.goal-form {
  width:400px;
  margin: 30px auto;
}




</style>
