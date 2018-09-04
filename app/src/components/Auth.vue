<template>
  <div>
    <h2>{{ label }}</h2>
    <button @click="type = isSignUp ? 'signIn' : 'signUp'">
      {{
        isSignUp
          ? "Already a user? Click here to sign in"
          : "New? Click here to sign up"
      }}
    </button>
    <pre>{{ error }}</pre>
    <form @submit.prevent="handleSubmit">
        <FormControl label="email">
          <input v-model="credentials.email">
        </FormControl>
        <FormControl label="password">
          <input
            :type="show ? 'text' : 'password'"
            v-model="credentials.password">
          <button 
            @click="show = !show"
            type="button"
          >
            {{ show ? 'Hide' : 'Show' }}
          </button>
        </FormControl>
        <FormControl>
          <button type="submit">
            {{ label }}
          </button>
        </FormControl>
    </form>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
