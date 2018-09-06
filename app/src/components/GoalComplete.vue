<template>
  <div >
    <div id="completed">
      <h2>Completed Goals</h2>
      
      <ul>
        <li v-for="goal in goals"
            :key="goal.id"
            v-if="goal.completed">
            {{ goal.name }}
            
        </li>
      </ul>
    </div>

    <div id="incomplete">
      <h2>To Do</h2>
      <ul >
        <li v-for="goal in goals"
          :key="goal.id"
          v-if="!goal.completed">
          {{ goal.name }}
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
export default {
  props: {
    goals: Array
  }
};
</script>

<style>

</style>
