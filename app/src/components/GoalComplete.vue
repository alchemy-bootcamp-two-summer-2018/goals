<template>
  <div id="table">
    <div id="completed">
      <h2>Complete</h2>
      
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

<style scoped>

  #table {
    display: flex;
    justify-content: space-evenly;
  }

  #completed {
    text-align: center;
    border: 2px solid green;
    padding: 0px 100px;
  }

  #incomplete {
    text-align: center;
    border: 2px solid green;
    padding: 0px 100px;
  }

</style>
