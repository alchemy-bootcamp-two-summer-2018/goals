<template>
    <header>
    <RouterLink v-if="!user" to="/auth">Sign In</RouterLink>
    </header>
</template>

<script>
export default {

};
</script>

<style>

</style>
