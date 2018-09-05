<template>
  <div>
    <ul>
      <li>Hello World</li>
    </ul>
    <AddGoals :on-add="handleAdd"/>
  </div>
</template>

<script>
import AddGoals from './AddGoals.vue';
import { addGoal }from '../services/api';
export default {
  props: {

  },
  data() {
    return {
      goals: null
        }
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
