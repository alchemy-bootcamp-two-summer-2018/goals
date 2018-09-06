<template>
  <div>
    <h3>Goals List</h3>
    <NewGoal :onAdd="handleAdd"/>
    <div 
      v-if="goals" 
      v-for="(goal, i) in goals"
      :key="goal.id">
      <p> 
        <img class="check" @click="handleComplete(i)" v-if="goal.complete" src="https://dictionary.cambridge.org/images/thumb/check_noun_002_06440.jpg?version=4.0.43">
        <img class="check" @click="handleComplete(i)" v-else src="https://cdn1.iconfinder.com/data/icons/toggle/512/checkbox-off-512.png">
        {{ goal.goal }}
      </p>
    </div>
  </div>
</template>

<script>
import { addGoal, getGoals, updateGoal } from '../services/api';
import NewGoal from './NewGoal';

export default {
  data() {
    return {
      goals: null,
    };
  },
  created() {
    getGoals()
      .then(goals => {
        this.goals = goals;
      });
  },
  methods: {
    handleAdd(goal) {
      return addGoal(goal)
        .then(saved => {
          this.goals.push(saved);
        });
    },
    handleComplete(index) {
      this.goals[index].complete = !this.goals[index].complete;
      updateGoal(this.goals[index]);
    }
  },
  components: {
    NewGoal
  }
};

</script>

<style scoped>

.check {
  height: 30px;
  width: 30px;
}

</style>
