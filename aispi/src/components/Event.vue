<template lang="jade">
    div.event(v-bind:style="{top, height}") {{event[6]}}
</template>

<script>
/* eslint-disable */

    // 1 hour block is 35px high
    const MINUTE_HEIGHT = 35 / 60

    export default {
        name: 'event',
        props: ['event'],
        data: function () {
            var top = (MINUTE_HEIGHT * (+this.event[4])) + 'px'
            var height = (MINUTE_HEIGHT * (+this.event[5])) + 'px'
            return {
                top: top,
                height: height
            }
        }
    } 
</script>

<style scoped>
    .event {
        width: 100%;
        float: right;
        background-color: #999;
        border-radius: 10px;
        position: absolute;
        right: 5px;
    }

</style>