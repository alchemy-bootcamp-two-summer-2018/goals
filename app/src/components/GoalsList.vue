<template>
  <div>
    <h3>Goals List</h3>
    <ul v-if="goals">
      <li
        v-for="goal in goals"
        :key="goal.id"
      >
        <strong>{{ goal.name }}</strong>
        &nbsp;
        {{ goal.description }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['goals']
};
</script>

<style scoped>
</style>