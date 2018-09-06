<template id="neighborhood-template">
  <div>
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
    label: String,
  }
};

</script>

<style scoped>

label {
  display: block;
  font-weight: bolder;
  font-size: 12px;
  margin-top: 10px;
}

</style>