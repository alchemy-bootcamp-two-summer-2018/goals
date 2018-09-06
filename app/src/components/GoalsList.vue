<template>
  <div id="goal-app">
    <h3>Goals List</h3>
    <div 
      class="goal" 
      v-for="(goal, i) in goals" 
      :key="goal.i"
    >
      <button @click="markAsCompleted(i)" class="goal__checkbox" :class="{goal__checkbox__completed: goal.completed}"></button>
      <p class="goal__text" :class="{goal__text__completed: goal.completed}">{{ goal.description}}</p>
    </div>
  </div>
</template>

<script>
import { updateGoal } from '../services/api';

export default {
  props: ['goals'],
  methods: {
    markAsCompleted(index) {
      this.goals[index].completed = !this.goals[index].completed;
      updateGoal(this.goals[index]);
    }
  }
};
</script>

<style scoped>

html {
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}



#goal-app {
  align-items: center;
  display: grid;
  grid-auto-flow: row;
  justify-items: center;
  margin-top: 30px;
  padding-bottom: 200px;
}

[v-cloak] {
  display: none;
}

h3 {
  font-family: 'Open Sans'
}
.add {
  grid-template-columns: 1fr;
}

.add__input {
  border: 0;
  color: var(--darkbacon);
  font-size: 1rem;
  padding: 0.9rem;
}

.goal {
  align-items: center;
  grid-template-columns: auto 1fr auto;
  justify-content: space-between;
}

.goal,
.add {
  border-bottom: 1px solid var(--darkbacon);
  display: grid;
  width: 65%;
}

.goal__checkbox,
.goal__delete {
  background-color: var(--darkbacon);
  border: 0;
  border-radius: 50%;
  cursor: pointer;
  height: 24px;
  width: 24px;
}

.goal__checkbox__completed,
.goal__text__completed {
  opacity: 0.45;
}

.goal__checkbox:hover {
  opacity: 0.75;
}

.goal__text {
  margin-left: 1.25rem;
  justify-self: start;
}

.goal__text__completed {
  text-decoration: line-through;
}

.goal__delete {
  background: none;
}

.goal__delete:hover {
  background-color: var(--darkbacon);
  color: var(--white);
}
</style>