<template>
    <div>
        <label>
            {{ label }}
        </label>
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
    margin-top: 10px;
    }
</style>
