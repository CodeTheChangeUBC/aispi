<template lang="jade">
    div#calendar__wrap
        popUp
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
            day(v-for="day in days" v-bind:number="day")
</template>

<script>
    /* eslint-disable */
    import Day from '@/components/Day'
    import PopUp from '@/components/PopUp'


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
            _updateDays: function () {
                var { month, year } = this.current
                var dayL = new Date(year, month + 1, 0).getDate()
                var days = []

                // TODO: Add Previous Month
                for (var i = 0; i < preL; i++) {

                }

                // Add Current Month
                for (var i = 0; i < dayL; i++) {
                    days.push(i+1)
                }

                this.days = days
            },
            next: function () {
                if (this.current.month == 11) {
                    this.current.year++
                    this.current.month = 0
                } else {
                    this.current.month++
                }
                this._updateDays()
            },
            prev: function () {
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
            return {
                consts: {
                    MONTHS
                },
                current: {
                    month: 0,
                    year: 2017
                },
                days: '.'.repeat(31).split('').map((a,i) => (i + 1))
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
