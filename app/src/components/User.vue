<template>
  <li>
    <div class="title">
      <h3>User: {{user.email}}</h3>
      <div class="user-goals" v-for="(goal, i) in user.goals" :key="goal.description">
        <p class="col-1">#{{i+1}}:</p>
        <p class="col-2">{{goal.description}}</p>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    user: Object
  }
};
</script>

<style scoped>


body {
  font-family: 'Open Sans';
}
li {
  list-style: none;
  border: 1px solid var(--darkbacon);
}
h3 {
  color: var(--darkbacon);
}

p {
  padding: 0px 5px;
}

.user-goals {
  display: grid;
  grid-template-columns: 0.1fr 1fr;
}
.col-1 {
  justify-self: end;
}
.col-2 {
  justify-self: start;
}

</style>

