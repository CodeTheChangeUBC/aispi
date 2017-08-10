<template lang="jade">
    div#calendar__wrap
        div#calendar__header
            div.header__item.header__item--left
                img(src="../assets/left.png" height="30px")
            div.header__item.header__item--label 
                .month MAY
                br
                .year 2017
            div.header__item.header__item--right
                img(src="../assets/right.png" height="30px")
        div#calendar
            day(v-for="day in days" v-bind:number="day")

</template>

<script>
    /* eslint-disable */
    import Day from '@/components/Day'

    export default {
        name: 'calendar',
        components: {
            Day
        },
        data () {
            return {
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
</style>
