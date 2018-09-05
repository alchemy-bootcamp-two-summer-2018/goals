<template>
  <div>
    <ul v-if="goals">
      <li v-for="goal in goals"
        :key="goal.id">
        {{ goal.name }}
      </li>
    </ul>
    <AddGoals :on-add="handleAdd"/>
  </div>
</template>

<script>
import AddGoals from './AddGoals.vue';
import { addGoal, getGoals }from '../services/api';
export default {
  props: {

  },
  data() {
    return {
      goals: null
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
    AddGoals
  },
  methods: {
    handleAdd(goal) {
      return addGoal(goal)
        .then(saved => {
          this.goals.push(saved);
        })
    }
  }

}
</script>

<style>

</style>
