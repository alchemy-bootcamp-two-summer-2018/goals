<template>
    <section class="goal-form">
        <form @submit.prevent="handleSubmit">
            <label>
                Add a goal<input type="text" name="goal" placeholder="Do it!" v-model="goal.name">
            </label>
            <!-- <FormControl label="Add a goal">
                <input type="text" name="goal">
            </FormControl> -->
            <button>Add</button>
        </form>
    </section>
</template>

<script>
import FormControl from './FormControl.vue';

const initGoal = () => {
    return {
        name: '',
        completed: false
    }
}
export default {
    data() {
        return {
            goal: initGoal(),
            // edit: this.goal ? Object.assign({}, this.goal) : initGoal()
        }
    },
    props: {
        onAdd: {
            type: Function,
            required: true
        }
    },
    methods: {
        handleSubmit() {
            return this.onAdd(this.goal)
                .then(() => {
                    this.goal = initGoal();
                })
        }
    },
    components: {
        FormControl
    },
}
</script>

<style>



</style>
