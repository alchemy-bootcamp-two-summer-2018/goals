<template>
  <div class="auth-form">
    <h2>{{ label }}</h2>
    <button @click="type = isSignUp ? 'signIn' : 'signUp'">
      {{
        isSignUp
          ? "Already a user? Click here to sign in"
          : "New? Click here to sign up"
      }}
    </button>
    <pre>{{ error }}</pre>
    <form class="auth-form" @submit.prevent="handleSubmit">
      <FormControl label="email">
        <input v-model="credentials.email">
      </FormControl>
      <FormControl label="password">
        <input 
          class="password"
          :type="show ? 'text' : 'password'" 
          v-model="credentials.password"> <br>
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
.auth-form {
  width: 200px;
  margin: 0 auto;
  text-align: left;
}

.password {
  margin-bottom: 5px;
}

button {
    border: 1px solid #383961;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    -webkit-transition-duration: 0.4s; 
    transition-duration: 0.4s;
    cursor: pointer;
}

button:hover {
  background-color: #383961;
  color: white;
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
}
</style>