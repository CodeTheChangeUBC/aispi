<template lang="jade">
    div.day(v-if="!number.disabled" @click="open()")
        div.day__number {{number.number}}
        div.event__wrap
            event(v-for="event in events"  v-bind:data="event" v-bind:key="event[0]" v-bind:event="event" type="label")
    div.day.day--disabled(v-else)
</template>

<script>
    /* eslint-disable */
    import Event from '@/components/Calendar/Event'

    export default {
        name: 'day',
        components: {
            Event
        },
        props: ['number', 'events'],
        data () {
            return {}
        },
        methods: {
            open (events) {
                console.log('open')
                this.$emit('open', this.events, this.number.number)
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
            background-color: rgba(255,255,255,0.2);
            border-color: transparent;
            box-shadow: none;
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
