<template lang='jade'>
    .view__popup(v-show="viewable" @click.self="close($event)")
        .container
            .event__holder
                .form__header.form__header--white Scheduled EVENTS
                event(v-for="event in events" v-bind:data="event" v-bind:key="event[0]" v-bind:event="event")
            .form__holder
                .form__header Register an Event
                div
                    table.inp__form
                        tr
                            td.inp__label School Name:
                            td
                                input(type="text" placeholder="" v-model="form.school").inp__full
                        tr
                            td.inp__label Event Type
                            td
                                .event__wrap
                                    .event__button(:class="{'event__button--active': form.type == 'PD'}" @click="toggleEvent('PD')")
                                    label.event__label Pro-D Day
                                .event__wrap
                                    .event__button(:class="{'event__button--active': form.type == 'GC'}" @click="toggleEvent('GC')")
                                    label.event__label Guest Class
                        tr
                            td.inp__label Appt Time:
                            td
                                input(type="time" @change="adjustTime" placeholder="" value="12:00" v-model="form.start").inp__full.inp__full--half
                                .time__label {{range}}

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
                                textarea(type="text" placeholder="" v-model="form.description").inp__full
                        tr
                            td(colspan="2").captcha
                                .coinhive-captcha(data-hashes="512" data-key="tjS9sJDGK60sMolaxhmzxzN0ts4e7nir"
                                data-callback="verified")
                    button(type="submit" @click="sendEvent" value="")#submit__button {{waiting?'':'Register Event'}}
                        img(v-if="waiting" src="../../assets/loading.gif" height="50px").loading__gif
</template>
<script>
    /* eslint-disable */
    import EventObj from '@/api/events'
    import Event from '@/components/Calendar/Event'
    import VueRecaptcha from 'vue-recaptcha'
    import Datetime from 'vue-datetime'
    

    const TESTING = true
    const TIMES = [ 
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
            collides (events, start, length) {
                // Convert "start" to minutes
                var [h,m] = start.split(':')
                var start = h*60 + (~~m)
                var end = start + (length * 60)

                for (var i = events.length; i--;) {
                    // Fetch the range of the start and end/
                    var start2 = +events[i][4]
                    var end2 = start2 + (+events[i][5])
                    // Look for a collision
                    // Taken from my scheduling algo
                    if((((start2>=start)&&(start2<end))||((end2>start)&&(end2<end)))||(((start>=start2)&&(start<end2))||((end>start2)&&(end<end2)))) {
                        return true
                    }
                }

                return false
            },
            adjustTime () {
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
            open (current, evs) {
                this.form.day = current.day
                this.form.year = current.year
                this.form.month = current.month
            },
            close () {
                this.$emit('close')
            },
            sendEvent () {
                if (this.waiting || (TESTING && this.validate())) {
                    return
                }
                    this.waiting = true
                    this.event.save()
                        .then(resp => {
                            // We're all good, so everything is good.
                            this.events.push(resp.event)
                            this.waiting = false
                        })
                        .catch(resp => {
                            this.waiting = false
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
            },
            toggleEvent (type) {
                this.form.type = type
                this.form.length = 3

                if (this.form.start) {
                    this.adjustTime()
                }
            },
            verified (token) {
                this.form.token = token
            },
            validate () {
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
                var collides = this.collides(this.events, this.form.start, this.form.length)

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
            window.event = this.event
        },
        data () {
            var event = new EventObj({
                day:         this.date.day,
                month:       this.date.month,
                year:        this.date.year,
                type:        '',
                token:       '',
                school:      '',
                start:       '',
                length:      '',
                address:     '',
                email:       '',
                description: '',
                type:        ''
            })

            return {
                TIMES,
                event,
                waiting: false,
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
        },
        watch: {
            'form.day'         (data) {this.event.update('day',data)},
            'form.month'       (data) {this.event.update('month',data)},
            'form.year'        (data) {this.event.update('year',data)},
            'form.type'        (data) {this.event.update('type',data)},
            'form.token'       (data) {this.event.update('token',data)},
            'form.school'      (data) {this.event.update('school',data)},
            'form.start'       (data) {this.event.update('start',data)},
            'form.length'      (data) {this.event.update('length', data)},
            'form.address'     (data) {this.event.update('address', data)},
            'form.email'       (data) {this.event.update('email',data)},
            'form.description' (data) {this.event.update('description',data)},
            'form.type'        (data) {this.event.update('type',data)},
        },
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
    .form__header--white
        color: #FFF

    .time__label
        font-family: Montserrat
        font-size: 11px
        font-weight: 600
        width: 43%
        display: inline-block
        color: #446CB3

    .captcha
        text-align: center
        padding-top: 10px
        transform: scale(0.8)

    .loading__gif
        margin-top: -10px

    #submit__button
        width: 140px;
        padding: 10px 15px;
        max-height: 50px;
        border: 1px solid #DDD;
        background-color: #FFF;
        color: #446CB3;
        border-radius: 5px;
        font-family: Montserrat;
        font-size: 11px
        letter-spacing: 1px
        cursor: pointer
        margin-top: 10px
        outline: 0
        transform: box-shadow 1s;
        &:hover
            box-shadow: 0px 0px 10px #446CB3
            transform: box-shadow 1s;
            box-shadow: 0px 0px 3px #444
        &:active
            box-shadow: 0px 0px 10px #444 inset
</style>