<template>
  <div>
    <h2>At Bacon, We Care About Our Users</h2>
    <p>
      Have you ever been lost? So far out at sea that you can't find dry land?
    </p>
    <p>
      Now you're found. One small step at a time, we'll help you back onto land and into the light.
    </p>
    <p>
      Go far, my son.
    </p>
  </div>
</template>

<script>

export default {

};

</script>

<style scoped>

h2 {
  font-size: 36px;
}

p.center {
  text-align: center;
}

p {
  font-size: 18px;
  text-align: left;
  width: 30%;
  padding: 10px;
  margin: 10px auto;
}

@media screen and (max-width: 480px) {

    p {
    width: 50%;
    }

    h2 {
      margin: 5% 10%;
    }
    
}

</style>
