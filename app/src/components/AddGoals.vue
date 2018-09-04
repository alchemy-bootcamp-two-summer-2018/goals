<template>
    <section class="goal-form">
        <form @submit.prevent="handleSubmit">
            <label>
                Add a goal<input type="text" name="goal" placeholder="Do it!">
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
        goal: ''
    }
}
export default {
    data() {
        return {
            edit: this.goal ? Object.assign({}, this.goal) : initGoal()
        }
    },
    props: {
        onEdit: {
            type: Function,
            required: true
        }
    },
    methods: {
        handleSubmit() {
            return this.onEdit(this.edit)
                console.log(this.edit)
                .then(() => {
                    this.edit = initGoal();
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
