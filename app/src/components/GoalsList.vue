<template>
  <div id="goal-app">
    <h3>Goals List</h3>
    <!-- <ul v-if="goals">
      <li
        v-for="goal in goals"
        :key="goal.id"
      >
        <strong>{{ goal.description }}</strong>
        &nbsp;
        {{ goal.completed }}
      </li>
    </ul> -->
    <div class="goal" v-for="(goal, i) in goals" :key="goal.description">
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
      console.log('inside update', this.goals[index]);
      updateGoal(this.goals[index]);
        // .then(added => {
        //   this.$router.push(`/houses/${added.id}`);
        // });
    }
  }
};
</script>

<style scoped>

:root {
  /* COLORS */
  --gray: #474143;
  --white: #ffffff;
  --tomato: #ff6444;
}

html {
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

body {
  color: var(--gray);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-kerning: auto;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialised;
  height: 100vh;
  margin: 0;
  text-rendering: optimizeLegibility;
}


#app {
  align-items: center;
  display: grid;
  grid-auto-flow: row;
  justify-items: center;
  margin-top: 1.5rem;
}

[v-cloak] {
  display: none;
}

.add {
  grid-template-columns: 1fr;
}

.add__input {
  border: 0;
  color: var(--gray);
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
  border-bottom: 1px solid var(--gray);
  display: grid;
  width: 65%;
}

.goal__checkbox,
.goal__delete {
  background-color: var(--gray);
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
  background-color: var(--tomato);
  color: var(--white);
}
</style>