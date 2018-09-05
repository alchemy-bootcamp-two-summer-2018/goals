<template>
  <div>
    <h3>Goals List</h3>
    <div v-if="goals">
      <p
        v-for="goal in goals"
        :key="goal.id"
      >
        {{ goal.goal }}
        {{ goal.status }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['goals']
};

</script>

<style>

</style>
