<template lang="jade">
    div.day(v-bind:class="{'day--disabled': !number.current}")
        div.day__number {{number.number}}
</template>

<script>
    /* eslint-disable */

    export default {
        name: 'day',
        props: ['number']
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
</style>
