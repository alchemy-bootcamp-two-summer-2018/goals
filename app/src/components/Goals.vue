<template>
  <div>
    
    <ul v-if="goals">
      <div v-for="(goal, i) in goals" :key="goal.id">
        <li>
          {{ goal.name }}

          <button v-if="goal.completed" @click="markAsCompleted(i)">Mark as Incomplete</button>
          <button v-else @click="markAsCompleted(i)">Mark as Complete</button>
    
        </li>
      </div>
    </ul>
    <AddGoals :on-add="handleAdd"/>
    <GoalComplete :goals="goals"/>
    <UserCount :goals="goals"/>
  </div>
</template>

<script>
import AddGoals from './AddGoals.vue';
import GoalComplete from './GoalComplete.vue';
import { addGoal, getGoals, updateGoal }from '../services/api';
import UserCount from './UserCount.vue';

const initGoalComplete = () => {
  return {
    completed: false
  }
}
export default {
  props: {

  },
  data() {
    return {
      goals: null,
      // goal: initGoals()
      goal: initGoalComplete()
      // this.goal ? Object.assign({}, this.goal) : initGoalComplete()
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
    GoalComplete,
    UserCount
  },
  methods: {
    handleAdd(goal) {
      return addGoal(goal)
        .then(saved => {
          this.goals.push(saved);
        })
    },
    markAsCompleted(index) {
      this.goals[index].completed = !this.goals[index].completed
      updateGoal(this.goals[index])
    }
   
  }

}
</script>

<style>
ul {
  list-style: none;
}
</style>
