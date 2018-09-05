<template id="goal-template">
  <section class="goal-form">
    <form @submit.prevent="handleSubmit">
      <div>
      <FormControl label="New Goal Description">
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
      </div>
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

<style scoped>
.goal-form {
  width: 300px;
  text-align: left;
  font-family: 'Open Sans';
  padding-top: 50px;
}

section {
  display: flex;
  margin: auto;
}

input {
  display: block;
  margin-top: 20px;
  margin-bottom: 20px;
}
button {
    background: #fa504d;
    border: none;
    color: white;
    text-transform: uppercase;
    letter-spacing: 2px;
    padding: 10px;
    font-weight: 600;
    box-shadow: -4px 2px 20px -6px rgba(0,0,0,0.75);
    transition: all .2s ease-in-out;
    margin-bottom: 200px;
}
button:hover {
    transform: scale(1.1); 
}
</style>