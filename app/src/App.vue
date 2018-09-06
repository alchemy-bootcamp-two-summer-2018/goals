<template>
    <div>
        hi
    </div>
</template>
<script>
import { signUp } from './services/api';

export default {
  created() {
    signUp();
  }
};
   
</script>