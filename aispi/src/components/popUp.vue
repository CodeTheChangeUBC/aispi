<template lang='jade'>
    div.view__popup(v-show="viewable" @click.self="close($event)")
        div.container
            div.container__header Booked Events
            div.event__holder
                div.time__container
                    div.event__time(v-for="time in TIMES") {{time}}
                div.event__container
                    event(v-for="event in events" v-bind:event="event")
                
</template>

<script>
    /* eslint-disable */
    import VueRecaptcha from 'vue-recaptcha'
    import Event from '@/components/Event'

    var TIMES = [
        '6:00 am', 
        '7:00 am', 
        '8:00 am',
        '9:00 am',
        '10:00 am',
        '11:00 am',
        '12:00 am',
        '1:00 pm', 
        '2:00 pm', 
        '3:00 pm',
        '4:00 pm',
        '5:00 pm',
        '6:00 pm',
        '7:00 pm', 
        '8:00 pm', 
        '9:00 pm'
    ]

    export default {
        name: 'PopUp',
        props: ['viewable','events'],
        components: {
            VueRecaptcha,
            Event
        },
        methods: {
            close: function () {
                this.$emit('close')
            }
        },
        data () {
            return {
                TIMES,
            }
        },
        created () {
            for (var i = 0; i < this.bookedEvent.length; i++) {
                this.bookedEvent[i].length = this.bookedEvent[i].interval * 80 / 960
                this.bookedEvent[i].top = this.times.indexOf(this.bookedEvent[i].startTime) * 80 / 16
            }
        }
    }
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Montserrat:200,400,500');

    .view__popup {
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0px;
        left: 0px;
        background-color: rgba(0,0,0,0.8);
        z-index: 1000;
    }
        .container {
            position: absolute;
            top: 50%;
            left: 50%;
            height: 606px;
            width: 800px;
            margin-top: -400px;
            margin-left: -400px;
            background-color: #EEE;
            border-radius: 5px;
            box-shadow: 0px 1px 1px #222222;
            overflow: hidden;
        }
        
        .container__header {
            font-family: Montserrat;
            font-size: 13px;
            text-align: left;
            padding: 15px;
            box-sizing: border-box;
            font-weight: 400;
            letter-spacing: 1px;
            text-transform: uppercase;
        }
        .event__holder{
            width: 400px;
            background-color: #CCC;
            display: inline-block;
            float: left;
        }
        .event__container {
            float: right;
            width: calc(100% - 100px);
            position: relative;
        }
        .time__container {
            height: 100%;
            float: left;
            width: 70px;
        }
            .event__time {
                float: left;
                font-size: 11px;
                color: #000;
                font-weight: 400;
                letter-spacing: 1px;
                padding: 5px;
                box-sizing: border-box;
                border-right: 1px solid #EEE;
                width: 70px;
                text-align: left;
                height: 35px;
                border-bottom: 1px solid #EEE;
            }


</style>
