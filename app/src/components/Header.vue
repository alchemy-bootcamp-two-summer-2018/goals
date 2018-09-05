<template>
    <header>
    <img alt="Bacon" src="../assets/logo.png">
    
    <div>
      <h1>Bacon</h1>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/auth">Sign Up</router-link>
        <router-link to="/goals">Goals</router-link>
        <router-link to="/users">Users</router-link>
      </nav>
    </div>


  </header>
</template>

<script>
export default {

};
</script>

<style scoped>

img {
  width: 200px;
  height: 200px;
}

a {
  display: inline-block;
  width: 140px;
  font-size: 24px;
  padding: 10px;
  margin: 15px;
  border: 1px solid black;
  text-decoration: none;
  color: white;
  border-radius: 5px;
  box-shadow: 0.5px 0.5px 0.5px black;
  background-color: rgba(65,214,195,0);
  border: 4px solid #ffd90000;
}

a:hover {
  background-color: rgba(65,214,195,1);
  box-shadow: 0.9px 0.9px 0.9px black;
  border: 4px solid rgba(243, 221, 97, 0.582);
}

h1 {
  font-family: 'Baloo Tammudu', cursive;
  font-size: 74px;
  font-weight: normal;
  display: inline-block;
  height: 100px;
  margin: 5px 0px 0px 0px;
  text-transform: uppercase;
  color: white;
  text-shadow: 2px 2px black;
}

nav {
  padding-bottom: 20px;
}

header {
  display: grid;
  grid-template-columns: 25% 50% 25%;
  box-shadow: 3px 2px 2px black;
  background: rgb(90,170,250);
}

header:hover {
  background: rgba(65,214,195,1);
}

</style>
