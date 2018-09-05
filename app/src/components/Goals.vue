<template>
  <div>
    <ul v-if="goals">
      <li v-for="goal in goals"
        :key="goal.id">
        {{ goal.name }}
        <button @click="handleComplete">Complete</button>
      </li>
    </ul>
    <AddGoals :on-add="handleAdd"/>
    <GoalComplete :goals="goals"/>
  </div>
</template>

<script>
import AddGoals from './AddGoals.vue';
import GoalComplete from './GoalComplete.vue';
import { addGoal, getGoals }from '../services/api';
export default {
  props: {

  },
  data() {
    return {
      goals: null,
    }
  },
  created() {
    getGoals() 
      .then(goals => {
        this.goals = goals;
      })
      .catch(err => {
        this.error = err;
      })
  },
  components: {
    AddGoals,
    GoalComplete
  },
  methods: {
    handleAdd(goal) {
      console.log(goal.completed)
      return addGoal(goal)
        .then(saved => {
          this.goals.push(saved);
        })
    },
    handleComplete() {

    }
  }

}
</script>

<style>
ul {
  list-style: none;
}
</style>
