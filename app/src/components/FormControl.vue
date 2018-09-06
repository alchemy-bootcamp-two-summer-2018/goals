<template>
  <div class="form-control">
    <label>
      {{ label }}
    </label>
    <div>
      <slot/>
    </div>
  </div>
    
</template>

<script>
export default {
  props: {
    label: String
  }
};
</script>

<style>


</style>
