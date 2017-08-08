<template lang="jade">
    div#calendar
        day(v-for="day in days" v-bind:number="day")

</template>

<script>
    /* eslint-disable */
    import Day from '@/components/Day'

    export default {
        name: 'calendar',
        components: {
            Day
        },
        data () {
            return {
                days: '.'.repeat(31).split('').map((a,i) => (i + 1))
            }
        }
    }
</script>

<style scoped>
    #calendar {
        width: 1000px;
        margin: auto;
    }
</style>
