<template lang="jade">
    div#calendar__wrap
        popUp(state="state" v-bind:viewable="popped" v-bind:state="error" @close="close")
        div#calendar__header
            div.header__item.header__item--left(@click="prev()")
                img(src="../assets/left.png" height="30px")
            div.header__item.header__item--label
                .month {{consts.MONTHS[current.month]}}
                br
                .year {{current.year}}
            div.header__item.header__item--right(@click="next()")
                img(src="../assets/right.png" height="30px")
        div#calendar
            day(v-for="day in days" v-bind:number="day" v-bind:events="day.events" v-bind:blocks="day.blocks" @open="open")
</template>

<script>
    /* eslint-disable */
    import Day from '@/components/Day'
    import PopUp from '@/components/PopUp'

//    import Blocks from '@/api/blocks'
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
        name: 'calendar',
        components: {
            Day,
            PopUp
        },
        methods: {
            open: function () {
                this.popped = true
            },
            close: function () {
                this.popped = false
            },
            _grabAPI: function () {
                var { month, year } = this.current
                var self = this
                var days = self.days
                
                // Fetch and add the events
                Events
                .fetch(month, year)
                .then(data => {
                    data
                    .forEach(event => {
                        for(var i = days.length; i--;) {
                            if (days[i].current && days[i].number == event[1]) {
                                days[i].events.push(event)
                            }
                        }
                    })
                    console.log(days)
                })
                .catch(error => {
                    self.errorMsg = error.message
                })

                // Fetch and add the blocks
                /*Blocks
                .fetch(month, year)
                .then(data => {

                })
                .catch(error => {
                    self.errorMsg = error.message
                })*/
            },
            _updateDays: function () {
                var { month, year } = this.current
                var dayL = new Date(year, month+1, 0).getDate()
                var days = []

                var preL = 0
                var startDay = new Date(year, month, 1).getDay()
                console.log(startDay)
                // Grab previous month's days
                if (month == 0) {
                    preL = new Date(year - 1, 12, 0).getDate()
                } else {
                    preL = new Date(year, month, 0).getDate()
                }

                // Add Previous Month
                for (var i = 0; i < startDay; i++) {
                    days.unshift({
                        number: preL--,
                        current: false,
                        events: []
                    })
                }

                // Add Current Month
                for (var i = 0; i < dayL; i++) {
                    days.push({
                        number: i+1,
                        current: true,
                        events: []
                    })
                }

                // Add Next Month
                var i = 1
                while (days.length % 7 != 0) {
                    days.push({
                        number: i++,
                        current: false,
                        events: []
                    })
                }

                this.days = days
                
                // Fill these days with appropriate events.
                this._grabAPI()
            },
            next: function () {
                // Set the month to the next month 
                if (this.current.month == 11) {
                    this.current.year++
                    this.current.month = 0
                } else {
                    this.current.month++
                }
                this._updateDays()
            },
            prev: function () {
                // Set the month to the prev month 
                if (this.current.month == 0) {
                    this.current.year--
                    this.current.month = 11

                } else {
                    this.current.month--
                }
                this._updateDays()
            }
        },
        data () {
            var month = new Date().getMonth()
            var year = new Date().getYear() + 1900
            
            // Things we're doing after the data is set and stack is clear.
            setTimeout(() => {
                this._updateDays()
            }, 1)


            return {
                consts: {
                    MONTHS
                },
                current: {
                    month: month,
                    year: year
                },
                error: null,
                popped: false,
                days: []
            }
        }
    }
</script>

<style scoped>
    #calendar__wrap {
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        text-align: center;
        background: #7474BF;
        background: -webkit-linear-gradient(to top, #348AC7, #7474BF);
        background: linear-gradient(to top, #348AC7, #7474BF);
    }
    #calendar {
        width: 910px;
        margin: auto;
        text-align: center;
        display: inline-block;
    }
    #calendar__header {
        font-size: 50px;
        color: #FFF;
        margin: 30px 0;
    }
        .header__item {
            display: inline-block;
            margin: 0 10px;
            cursor: pointer;
            line-height: 20px;
        }
        .year{
            font-size: 20px;
            letter-spacing: 1px;
        }
        .month {
            width: 110px;
        }
</style>
