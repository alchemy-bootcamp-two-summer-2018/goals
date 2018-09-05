<template>
  <section>
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

<style scoped>
pre {
  color: red;
}

</style>