<template>
  <div>
    
    <ul v-if="goals">
      <div v-for="(goal, i) in goals" :key="goal.id">
        <li>
          {{ goal.name }}
          <button v-if="goal.completed" @click="markAsCompleted(i)" class="complete">Done!</button>
          <button v-else @click="markAsCompleted(i)" class="incomplete">To Do</button>
    
        </li>
      </div>
    </ul>
    <AddGoals :on-add="handleAdd"/>
    <GoalComplete :goals="goals"/>
    <AllUsers v-for="user in users" 
      :key="user.id"
      :user="user"/>
  </div>
</template>

<script>
import AddGoals from './AddGoals.vue';
import GoalComplete from './GoalComplete.vue';
import { addGoal, getGoals, updateGoal, getUserInfo } from '../services/api';
import AllUsers from './AllUsers.vue';

const initGoalComplete = () => {
  return {
    completed: false
  };
};

export default {
  props: {

  },
  data() {
    return {
      goals: null,
      goal: initGoalComplete(),
      users: null
    };
  },
  created() {
    getGoals() 
      .then(goals => {
        this.goals = goals;
      })
      .catch(err => {
        this.error = err;
      });
   
    getUserInfo()
      .then(users => {
        this.users = users;
      })
      .catch(err => {
        this.error = err;
      });
  },
  components: {
    AddGoals,
    GoalComplete,
    AllUsers
  },
  methods: {
    handleAdd(goal) {
      return addGoal(goal)
        .then(saved => {
          this.goals.push(saved);
        });
    },
    markAsCompleted(index) {
      this.goals[index].completed = !this.goals[index].completed;
      updateGoal(this.goals[index]);
    }
   
  }

};
</script>

<style>
ul {
  list-style: none;
}

.complete {
  background-color: rgb(61, 253, 61);
}
.incomplete {
  background-color: rgb(252, 66, 66);
}

button {
  border-radius: 10px;
  margin-left: 15px;
  margin-top: 5px;
}
</style>
