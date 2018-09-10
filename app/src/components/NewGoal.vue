<template>
  <section>
    <h3 class="add-title">Add Goal</h3>
    <GoalForm
      label="Add"
      :onEdit="onAdd"/>
  </section>
</template>

<script>
import GoalForm from './GoalForm';

export default {
  props: ['onAdd'],
  components: {
    GoalForm
  }
};
</script>

<style scoped>

.add-title {
  margin: 15px;
}

</style>
