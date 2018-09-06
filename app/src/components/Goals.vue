<template>
    <div>
    <h2>List of goals</h2>
    <ul>
        <li
            v-for="goal in goals"
            :key="goal.id"
        >
        </li>
    </ul>
    </div>
</template>

<script>
import { getUser, addGoal} from '../services/api';

export default {
  props: ['goals']
};
</script>

<style>

</style>
