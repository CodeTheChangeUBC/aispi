<template lang='jade'>
    div.view__popup(v-show="viewable" @click.self="close($event)")
        div.container
            div.event__holder
                div.time__container
                    div.event__time(v-for="time in TIMES") {{time}}
                div.event__container
                    event(v-for="event in events" v-bind:event="event")
            div.form__holder
                div.form__header Event Details
                table.inp__form
                    tr
                        td.inp__label School Name:
                        td
                            input(type="text" placeholder="").inp__full
                    tr
                        td.inp__label Start Time:
                        td
                            input(type="text" placeholder="").inp__full.inp__full--half
                            div.time__label 8:00 PM

                    tr
                        td.inp__label Email:
                        td
                            input(type="text" placeholder="").inp__full
                    tr
                        td.inp__label Address:
                        td
                            input(type="text" placeholder="").inp__full
                    tr
                        td.inp__label Additional Info:
                        td
                            textarea(type="text" placeholder="").inp__full
                    tr
                        td(colspan="2" style="text-align: center;padding-top:10px;transform: scale(0.8)")
                            div(class="g-recaptcha" style="display:inline-block" data-sitekey="6LdxTi4UAAAAALdEW9pPOkXtQSg0jlfXqAM2tcSI")
                button#submit__button Create Event
</template>

<script>
    /* eslint-disable */
    import Event from '@/components/Calendar/Event'

    var TIMES = [ 
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

<style lang="sass" scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat:200,400,500')
@import url('https://fonts.googleapis.com/css?family=Open+Sans')

.view__popup
    font-family: Arial
    height: 100%
    width: 100%
    position: absolute
    top: 0px
    left: 0px
    background-color: rgba(0, 0, 0, 0.8)
    z-index: 1000
    transition: opacity 1s

.container
    position: absolute
    top: 50%
    left: 50%
    height: 586px
    width: 800px
    margin-top: -300px
    margin-left: -400px
    background-color: #FFF
    border-radius: 5px
    box-shadow: 0px 1px 1px #222222
    overflow: hidden

.event__holder
    width: 400px
    background-color: #FFF
    display: inline-block
    float: left
    background-color: #F9f9f9
    border-left: 0
    border-bottom: 0
    box-sizing: border-box

.event__container
    display: inline-block
    position: relative
    text-align: center

.time__container
    height: 100%
    display: inline-block
    width: 70px
    float: left
    font-family: Open Sans

.event__time
    float: left
    font-size: 11px
    font-weight: 400
    letter-spacing: 1px
    box-sizing: border-box
    width: 80px
    text-align: right
    height: 38px
    background-color: rgba(0, 0, 0, 0.02)
    margin-bottom: 1px
    color: #000
    line-height: 35px
    padding-right: 6px

.form__holder
    width: 400px
    float: right

.inp__label
    font-family: Open Sans
    font-weight: 600
    color: #000
    font-size: 12px
    text-align: left

.inp__full
    width: 90%
    padding: 10px
    font-family: Montserrat
    border: 0
    font-size: 12px
    text-align: center
    outline: 0
    background-color: #FFF
    border: 1px solid #DDD
    box-shadow: 0px 1px 1px #EEE inset
    margin-top: 10px
    border-radius: 3px
    text-align: left
    transition: border-color .5s
    &:focus
        border-color: #7474BF
        transition: border-color .5s

.inp__full--half
    width: 20%

textarea.inp__full
    min-height: 80px
    resize: none

.inp__form
    padding: 0
    margin-left: 2.5%
    width: 90%
    box-sizing: border-box
    float: left

.form__header
    color: #000
    font-weight: 400
    font-family: Montserrat
    text-transform: uppercase
    letter-spacing: 1px
    margin: 20px 0

.time__label
    font-family: Montserrat
    font-size: 11px
    font-weight: 600
    width: 43%
    display: inline-block
    color: #446CB3

#submit__button
    width: 140px;
    padding: 10px 15px;
    border: 1px solid #446CB3;
    background-color: #FFF;
    color: #446CB3;
    border-radius: 5px;
    font-family: Montserrat;
    font-size: 11px
    letter-spacing: 1px
    cursor: pointer
    margin-top: 10px
    outline: 0
    transform: background-color .5s;
    &:hover
        background-color: #446CB3
        color: #FFF
        transform: background-color .5s;
        box-shadow: 0px 0px 3px #444
    &:active
        box-shadow: 0px 0px 10px #444 inset
</style>
