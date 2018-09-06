<template>
  <main>
    <div class="welcome">
        <p>
          Click <router-link to="/auth">here</router-link> to sign up!
        </p>
    </div>
  </main>
</template>

<script>
export default {
};
</script>

<style scoped>
main {
  background-image: url("/home_bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;
  /* padding: 300px; */
  padding-top: 1px;
  min-height: 500px;
  height: 70vh;
 
}
.welcome{
  margin-top: 5%;
  margin-left: 10%;
  text-align:left;
  font-size: 30px;
}

button {
    background: #fa504d;
    border: none;
    color: white;
    text-transform: uppercase;
    letter-spacing: 2px;
    padding: 20px;
    font-weight: 600;
    box-shadow: -4px 2px 20px -6px rgba(0,0,0,0.75);
    transition: all .2s ease-in-out;
}
button:hover {
    transform: scale(1.1); 
}
a {
    font-family: 'Open Sans';
    text-decoration: none;
    text-transform: uppercase;
    color: red;
  }
</style>