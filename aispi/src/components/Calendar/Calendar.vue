<template lang="jade">
    div
        div#calendar__wrap
            div#calendar__head
                div.calendar__inner
                    //img(src="../../assets/ASPI.K.png" height="50px")#calendar__logo
                    span.logo__text
                        img(src="../../assets/ASPI.RGB.png" style="margin-bottom: -20px;margin-right: 20px;" height="50px")
                        |Event Planner
                    #date__text
                        .date__text--month {{MONTHS[current.month - 1]}}
                        .date__text--year {{current.year}}
                    br
                    br
                    div#calendar__controls
                        div.calendar__controlBtn(@click="prev()")
                            img(height="20px" src="../../assets/left.png")
                        div.calendar__controlBtn(@click="next()")
                            img(height="20px" src="../../assets/right.png")
            div#calendar__body
                div#calendar__week
                    div.calendar__weekPart SUN
                    div.calendar__weekPart MON
                    div.calendar__weekPart TUE
                    div.calendar__weekPart WED
                    div.calendar__weekPart THU
                    div.calendar__weekPart FRI
                    div.calendar__weekPart SAT
                day(v-for="day in days" v-bind:data="day" v-bind:key="day.number" v-bind:number="day" v-bind:events="day.events" v-bind:blocks="day.blocks" @open="open")
        PopUp(v-bind:viewable='viewable' ref="popup" v-bind:events="events" @close="(viewable=false)" v-bind:date="current")
</template>

<script>
    /* eslint-disable */
    import PopUp from '@/components/Calendar/PopUp'
    import Day from '@/components/Calendar/Day'
    import Events from '@/api/events'

    const MONTHS = [
        'JAN',
        'FEB',
        'MAR',
        'APR',
        'MAY',
        'JUN',
        'JUL',
        'AUG',
        'SEP',
        'OCT',
        'NOV',
        'DEC'
    ]

    export default {
        name: 'Calendar',
        components: {
            Day,
            PopUp
        },
        data () {
            var date = new Date()
            var current = {day: 0,month: date.getMonth() + 1, year: date.getYear() + 1900}
            setTimeout(() => {
                this._writeDays(current.month, current.year)
                this._fetch()
            })
            return {
                MONTHS,
                current,
                offset: 0,
                viewable: false,
                events: [],
                days: []
            }
        },
        methods: {
            prev () {
                this.current.month--

                // Handle underflow
                if (this.current.month < 1) {
                    this.current.month = 12
                    this.current.year--
                }

                this._writeDays(this.current.month, this.current.year)
                this._fetch()
            },
            next () {
                this.current.month++

                // Handle overflow
                if (this.current.month > 12) {
                    this.current.month = 1
                    this.current.year++
                }

                this._writeDays(this.current.month, this.current.year)
                this._fetch()
            },
            open (evs, day) {
                this.current.day = day
                this.events = evs
                this.$refs.popup.open(this.current, this.events)
                this.viewable = true
            },
            _writeDays (month, year) {
                var days = []

                this.offset = this._first(month, year)

                for (var i = this.offset; i--;) {
                    days.push({
                        disabled: true
                    })
                }
                for (var i = 0; i < this._days(month, year); i++) {
                    days.push({
                        number: i + 1,
                        current: 1,
                        events: []
                    })
                }
                
                while (days.length % 7) {
                    days.push({
                        disabled: true
                    })
                }
                this.days = days
            },
            _handleEvents (data) {

                data.forEach((event) => {
                    this.days[event[1] - 1 + this.offset].events.push(event)
                })
            },
            _fetch () {                
                Events
                .fetch(this.current.month, this.current.year)
                .then(this._handleEvents)
            },
            _first (month, year) {
                return new Date(year, month - 1, 1).getDay()
            },
            _days (month, year) {
                return new Date(year, month, 0).getDate();
            }
        }
    }
</script>
<style lang="sass">
    body
        overflow-y: scroll
    #calendar__wrap
        position: absolute
        top: 0px
        left: 0px
        width: 100%
        min-height: 100%
        text-align: center
        background: #7474BF
        background: -webkit-linear-gradient(to bottom, #DDD, #7474BF)
        background: linear-gradient(to bottom, #DDD, #7474BF)
    
    .calendar__inner
        width: 800px
        margin: auto
        text-align: left
        line-height: 70px

    #calendar__head
        position: absolute
        top: 40px
        left: 0px
        width: 100%
        text-align: center

    #calendar__logo
        height: 70px
        background: rgba(255,255,255, 0.5)
        padding: 10px
        border-radius: 15px
        float: right
        box-sizing: border-box

    .logo__text
        color: #000
        font-family: Montserrat
        font-weight: 400
        font-size: 20px
        letter-spacing: 1px
        margin-left: 20px
        float: right

    #date__text
        font-family: Montserrat
        font-weight: 300
        font-size: 50px
        float: left
        color: #000
    .date__text--month
        display: inline-block
    .date__text--year
        display: inline-block
        font-size: 16px
        margin-left: 20px
        margin-top: 10px



    #calendar__controls
        float: left
        margin-top: -70px
        margin-left: 20px

    .calendar__controlBtn
        background-color: #FFF
        border-radius: 5px
        height: 30px
        line-height: 40px
        width: 40px
        text-align: center
        display: inline-block
        margin-right: 10px
        box-shadow: 0px 1px 1px rgba(0,0,0,0.5);
        cursor: pointer

    #calendar__body
        margin: auto;
        margin-top: 200px;
        width: 910px;
    
    .calendar__weekPart
        margin-bottom: 10px;
        display: inline-block
        width: 130px
        color: #000
        font-size: 12px
        
</style>
