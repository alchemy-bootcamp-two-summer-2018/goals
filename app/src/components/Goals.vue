<template>
    <div>
        <ul>
            <li>Hello World</li>
        </ul>
        <AddGoals :onEdit="onAdd"/>
    </div>
</template>

<script>
import AddGoals from './AddGoals.vue';

export default {
    props: ['onAdd'],
    components: {
        AddGoals
    }

}
</script>

<style>

</style>
