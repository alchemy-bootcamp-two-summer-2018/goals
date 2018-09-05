<template>
    <div>
        {{}}
    <!-- <nav>
      <NavLink to='/goals/list'>list</NavLink>
      &nbsp;
      <NavLink to='/goals/new'>add</NavLink>
    </nav>

    <RouterView 
      :on-add="handleAdd"
    ></RouterView> -->
    </div>
</template>

<script>
import { getGoals, addGoal, updateGoal } from '../services/api';
import NavLink from './NavLink';
export default {
  components: {
    // NavLink
  },
  data() {
    return {
      quadrant: null
    };
  },
//   created() {
//     getQuadrant(this.$route.params.id)
//       .then(quadrant => {
//         this.quadrant = quadrant;
//       });
//   },
  methods: {
    handleAdd(goal) {
      neighborhood.quadrantId = this.quadrant.id;
      return addNeighborhood(neighborhood)
        .then(saved => {
          this.quadrant.neighborhoods.push(saved);
          this.$router.push(`/quadrants/${this.quadrantId}`);
        });
    }
  }
};
</script>

<style scoped>
pre {
  text-align: left;
}
</style>