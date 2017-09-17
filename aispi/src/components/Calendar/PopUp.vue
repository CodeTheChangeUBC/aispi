<template lang='jade'>
    div.view__popup(v-show="viewable" @click.self="close($event)")
        div.container
            div.event__holder
                div.time__container
                    div.event__time(v-for="time in TIMES") {{time}}
                div.event__container
                    event(v-for="event in events" v-bind:event="event")
            div.form__holder
                input(type="text" placeholder="School Name").inp__full
                input(type="text" placeholder="Email").inp__full
                input(type="text" placeholder="Address").inp__full
                input(type="text" placeholder="Date").inp__full
                textarea(type="text" placeholder="Additional Info").inp__full
</template>

<script>
    /* eslint-disable */
    import VueRecaptcha from 'vue-recaptcha'
    import Event from '@/components/Calendar/Event'

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
        }
    }
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Montserrat:200,400,500');

    .view__popup {
        font-family: Arial;
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
            background-color: #DDD;
            border-radius: 5px;
            box-shadow: 0px 1px 1px #222222;
            overflow: hidden;
        }

        .event__holder{
            width: 400px;
            background-color: #FFF;
            display: inline-block;
            float: left;
            border: 1px solid #AAA;
            border-left: 0;
            border-bottom: 0;
            border-top-right-radius: 6px;
            box-sizing: border-box;
        }
        .event__container {
            display: inline-block;
            position: relative;
            text-align: center;
        }
        .time__container {
            height: 100%;
            display: inline-block;
            width: 70px;
            float: left;
            font-family: Montserrat;
        }
            .event__time {
                float: left;
                font-size: 11px;
                font-weight: 300;
                letter-spacing: 1px;
                box-sizing: border-box;
                width: 70px;
                text-align: left;
                height: 35px;
                border-right: 1px solid rgba(0,0,0,0.1);
                border-bottom: 1px solid rgba(0,0,0,0.1);
                background-color: #DDD;
                color: #000;
                line-height: 35px;
                padding-left: 6px;
            }
        
        .form__holder{
            width: 400px;
            float: right;
        } 
        .inp__full {
            width: 60%;
            padding: 10px;
            font-family: Montserrat;
            border: 0;
            font-size: 12px;
            text-align: center;
            outline: 0;
            background-color: #FFF;
            border: 1px solid #AAA;
            margin-top: 10px;
            border-radius: 5px;
            transition: border-color .25s;
        }
            .inp__full:focus{
                border-color: #7474BF;
                transition: border-color .25s;
            }
        textarea.inp__full {
            min-height: 80px;
            resize: none;
        }
</style>
