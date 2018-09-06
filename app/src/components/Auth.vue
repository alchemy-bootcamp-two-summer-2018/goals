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
    
    <div class="auth-form">
      <pre>{{ error }}</pre>
      <form @submit.prevent="handleSubmit">

        <FormControl label="email">
          <input class="email-input" v-model="credentials.email">
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
  </div>
</template>

<script>
import { signUp, signIn } from '../services/api';
import FormControl from './FormControl';

export default {
  props: {
    onUser: Function
  },
  components: {
    FormControl
  },
  data() {
    return {
      credentials: {
        email: '',
        password: ''
      },
      show: false,
      type: 'signIn',
      error: null
    };
  },
  computed: {
    isSignUp() {
      return this.type === 'signUp';
    },
    label() {
      return this.isSignUp ? 'Sign Up' : 'Sign In';
    }
  },
  watch: {
    type(newType, oldType) {
      if(newType !== oldType) {
        this.error = null;
      }
    }
  },
  methods: {
    handleSubmit() {
      this.error = null;
      const action = this.isSignUp ? signUp : signIn;
      action(this.credentials)
        .then(user => {
          this.onUser(user);
          this.$router.push('/');
        })
        .catch(err => {
          this.error = err;
        });
    }
  }
};

</script>

<style scoped>

.email-input {
  width: 220px;
}

.auth-form {
  width: 350px;
  margin: 0 auto;
}

.form-control {
  margin: 0 auto;
}

input {
  margin: 0px auto;
}


</style>
