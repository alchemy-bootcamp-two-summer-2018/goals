<template>
  <section>
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

<style>

</style>
