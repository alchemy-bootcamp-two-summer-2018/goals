<template id="goal-template">
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

<style scoped>
  .form-control h3 {
    padding-bottom: 10px;
  }
</style>
