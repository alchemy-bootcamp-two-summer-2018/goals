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

<style>

pre {
  color: red;
}

ul.list {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

</style>
