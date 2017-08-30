<template lang="jade">
    div.day(v-bind:class="{'day--disabled': !number.current}"  @click="open(events)")
        div.day__number {{number.number}}
        div.event__wrap
            div.event(v-for="event in events") {{event[7]}}
</template>

<script>
    /* eslint-disable */

    export default {
        name: 'day',
        props: ['number', 'events'],
        methods: {
            open (events) {
                this.$emit('open', events)
            }
        }
    }
</script>

<style scoped>
    .day {
        height: 130px;
        width: 130px;
        background-color: #FFF;
        float: left;
        margin: 0 auto;
        box-sizing: border-box;
        border-right: 1px solid #EEE;
        border-bottom: 1px solid #EEE;
        box-shadow: 0px 1px 1px rgba(0,0,0,0.15);
        cursor: pointer;
        position: relative;
        border-radius: 5px;
        color: #444;
        overflow-y: hidden;
    }
        .day--disabled {
            background-color: #EEE;
            color: #999;
        }
        .day__number {
            font-size: 11px;
            font-weight: 400;
            float: left;
            margin: 5px;
            padding: 3px;
            height: 20px;
            width: 20px;
            box-sizing: border-box;
            border-radius: 100px;
            background-color: #EEE;
            color: #999;
        }
        .event__wrap {
            width: calc(100% - 4px);
            float: left;
            margin-left: 2px;
        }
        .event {
            padding: 2px;
            box-sizing: border-box;
            font-size: 11px;
            margin-top: 1px;
            color: #FFF;
            background-color: #999;
            border-radius: 5px;
        }
</style>
