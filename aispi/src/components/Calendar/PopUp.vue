<template lang='jade'>
    div.view__popup(v-show="viewable" @click.self="close($event)")
        div.container
            div.event__holder
                div.form__header(style="color: #FFF") Scheduled EVENTS
                event(v-for="event in events" v-bind:data="event" v-bind:key="event[0]" v-bind:event="event")
            div.form__holder
                div.form__header Register an Event
                div
                    table.inp__form
                        tr
                            td.inp__label School Name:
                            td
                                input(type="text" placeholder="" v-model="form.school").inp__full
                        tr
                            td.inp__label Event Type
                            td
                                div.event__wrap
                                    div.event__button(:class="{'event__button--active': form.type == 'PD'}" @click="toggleEvent('PD')")
                                    label.event__label Pro-D Day
                                div.event__wrap
                                    div.event__button(:class="{'event__button--active': form.type == 'GC'}" @click="toggleEvent('GC')")
                                    label.event__label Guest Class
                        tr
                            td.inp__label Appt Time:
                            td
                                input(type="time" @change="adjustTime" placeholder="" value="12:00" v-model="form.start").inp__full.inp__full--half
                                div.time__label {{range}}

                        tr
                            td.inp__label Email:
                            td
                                input(type="text" placeholder="" v-model="form.email").inp__full
                        tr
                            td.inp__label Address:
                            td
                                input(type="text" placeholder="" v-model="form.address").inp__full
                        tr
                            td.inp__label Additional Info:
                            td
                                textarea(type="text" placeholder="" v-model="form.info").inp__full
                        tr
                            td(colspan="2" style="text-align: center;padding-top:10px;transform: scale(0.8)")
                                div.coinhive-captcha(data-hashes="512" data-key="tjS9sJDGK60sMolaxhmzxzN0ts4e7nir"
                                data-callback="verified")
                    input(type="submit" @click="sendEvent" value="Register Event")#submit__button
</template>
<script>
    /* eslint-disable */
    import EventAPI from '@/api/events'
    import Event from '@/components/Calendar/Event'
    import VueRecaptcha from 'vue-recaptcha'
    import Datetime from 'vue-datetime'
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

    const HOUR = 60 * 60 * 1000
    export default {
        name: 'PopUp',
        props: ['viewable','events','date'],
        components: {
            Event,
            VueRecaptcha,
            Datetime
        },
        methods: {
            adjustTime: function () {
                var time = this.form.start
                var [h,m] = time.split(':')

                var start = new Date()
                start.setHours(h)
                start.setMinutes(m)
                this.range = time
                
                // If there isn't an event type set, we're done.
                if (!this.form.type) {
                    return
                }

                var endT = start.getTime() + (HOUR * this.form.length)
                var end = new Date(endT)

                var endH = end.getHours().toString()
                var endM = end.getMinutes().toString()

                endM = (endM.length == 1 ? "0" : "") + endM

                this.range += (' - ' + endH + ':' + endM)

            },
            open:  function (current, evs) {
                this.form.day = current.day
                this.form.year = current.year
                this.form.month = current.month
            },
            close: function () {
                this.$emit('close')
            },
            sendEvent: function () {
                if (this.validate()) {
                    EventAPI.post(this.form)
                        .then(resp => {
                            // We're all good, so everything is good.
                            this.events.push(resp.event)
                        })
                        .catch(resp => {
                            // This is when the server catches an error.
                            if (resp && resp.error) {
                                this.$swal(
                                    'Error with the form...',
                                    resp.error,
                                    'error'
                                    )
                                return
                            }
                            // This is when we can't even reach the server
                            this.$swal(
                                'Could not connect to server :(',
                                ' Please check your internet connection',
                                'error'
                           )
                        })
                }
            },
            toggleEvent: function (type) {
                this.form.type = type
                this.form.length = 3

                if (this.form.start) {
                    this.adjustTime()
                }
            },
            verified: function (token) {
                this.form.token = token
            },
            validate: function () {
                // Make sure we selected an event
                if (!this.form.type) {
                    this.$swal('Please select an event!','','warning')
                    return false
                }
                // Make sure this is a valid email
                if (!this.form.email || !this.form.email.match(/@/g)) {
                    this.$swal('Please Enter a Valid Email!','','warning')
                    return false
                }
                var timeGex = /[0-9]{2}:[0-9]{2}/g

                // Make sure this is a valid time
                if (!timeGex.test(this.form.start)) {
                    this.$swal('Please enter a valid time!','','warning')
                    return false
                }
                // TODO: Make sure this doesn't conflict with any existing events.
                var collides = EventAPI.collides(this.events, this.form.start, this.form.length)

                if (collides) {
                    this.$swal('This timeslot conflicts with another appointment','','warning')
                    return false
                }

                // Make sure the token is set
                if (!this.form.token) {
                    this.$swal('Please click the verification button','','warning')
                    return false
                }
                return true
            }
        },
        mounted () {
            // Mount verification function for the auth callback
            window.verified = this.verified
        },
        data () {

            return {
                TIMES,
                range: "",
                form: {
                    day:          this.date.day,
                    month:        this.date.month,
                    year:         this.date.year,
                    type:         "",
                    token:        "",
                    school:       "",
                    start:        "",
                    length:       0,
                    address:      "",
                    email:        "",
                    description:  "",
                    type:         ""
                }
            }
        }
    }
</script>

<style lang="sass" scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat:200,400,500')
@import url('https://fonts.googleapis.com/css?family=Open+Sans')


.event__wrap
    margin-top: 10px;
    display: inline-block;

.event__button
    cursor: pointer;
    height: 30px;
    width: 30px;
    border: 3px solid #EEE;
    border-radius: 20px;
    margin: 0 30px
.event__button--active
    background-color: #446CB3
    border-color: #FFF

.event__label
    font-family: Montserrat
    font-size: 11px
    font-weight: 600
    text-transform: uppercase

.view__popup
    font-family: Arial
    height: 100%
    width: 100%
    position: fixed
    overflow-y: scroll
    top: 0px
    left: 0px
    background-color: rgba(0, 0, 0, 0.8)
    z-index: 1000
    transition: opacity 1s

    

.container
    margin: 100px auto
    height: 610px
    width: 800px
    background-color: #FFF
    border-radius: 5px
    box-shadow: 0px 1px 1px #222222
    overflow: hidden

.event__holder
    width: 400px
    display: inline-block
    float: left
    height: 100%
    background-color: #446CB3
    border-left: 0
    border-bottom: 0
    box-sizing: border-box

.event__container
    background-color: #F9f9f9
    display: inline-block
    position: relative
    text-align: center
    width: calc(100% - 150px)

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
    width: 40%
    margin-right: 10px

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
    font-weight: 600
    font-size: 13px
    font-family: Montserrat
    text-transform: uppercase
    letter-spacing: 1px
    margin: 10px 0

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