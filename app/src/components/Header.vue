<template>
  
  <header>
    <!-- <div classe="header">
      <button>Menu</button>
       <nav>
      <div class="links first">
        link 1
        link 2
      </div>
      <div class="title-link">
        Title
      </div>
      <div class="links second">
        link 3
        link 4
      </div>
      </nav>
      <button>Search</button> 
    </div> -->
    <h2>Goals goals goals!</h2>
  </header>
</template>

<script>
export default {
  name: "Header",
}
</script>

<style scoped>
  div {
    border: 1px solid red;
  }
  .header {
    display: flex;
    justify-content: space-between;
  }
  .links {
    display: none;
  }
</style>
