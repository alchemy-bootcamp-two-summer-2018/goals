<template id="goal-template">
  <section class="goal-form">
    <form @submit.prevent="handleSubmit">
      <FormControl label="Description">
        <input type="text" 
          name="description" placeholder="Description" required
          v-model="edit.description">
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
  margin: 0 auto;
  text-align: center;
}

label {
  display: block;
}
button {
    border: 1px solid #383961;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    -webkit-transition-duration: 0.4s; 
    transition-duration: 0.4s;
    cursor: pointer;
}

button:hover {
  background-color: #383961;
  color: white;
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
}
</style>