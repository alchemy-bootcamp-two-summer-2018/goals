<template>
  <section class="goal-form">
    <GoalForm 
      label="Add"
      :on-edit="onAdd"/>
  </section>
</template>

<script>
import GoalForm from './GoalForm.vue';
export default {
  props: ['onAdd'],
  components: { 
    GoalForm
  }
};
</script>

<style>
.goal-form {
  width: 300px;
  text-align: center;
}
</style>