<template>
  <section class="goal-form">
    <form @submit.prevent="handleSumbit">
      <FormControl label="Name">
        <input type="text"
          name="name" placeholder="Name" required
          v-model="edit.name">
      </FormControl>
      <FormControl label="Goal">
        <input type="text" name="goal" placeholder="goal" required
          v-model.number="edit.goal">
      </FormControl>
      <FormControl>
        <button type="submit">{{ label }} </button>
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
import FormControl from './FormControl';

const initGoal = () => {
  return {
    name
  }
}
export default {

};
</script>

<style>

</style>
