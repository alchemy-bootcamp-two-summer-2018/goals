<template>
  <RouterLink v-bind="$attrs">
    <span class="nav-link">
      <slot/>
    </span>
  </RouterLink>
</template>

<style scoped>
:root {
  /* COLORS */
  --lightbacon: #e9cfa5;
  --white: #ffffff;
  --black: black;
  --darkbacon: #fea793;
}

.nav-link {
  height: 25px;
  background: var(--darkbacon);
  color: black;
  padding: 15px;
  text-decoration: none;
  border: 1px solid black;
  border-radius: 7px 7px;
}
.nav-link:hover {
  background: var(--lightbacon);
  color: black;
}
</style>