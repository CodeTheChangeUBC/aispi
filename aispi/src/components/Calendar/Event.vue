<template lang="jade">
    div.event(v-bind:style="{top, height, backgroundColor}")
        div.event--time {{range}}
        div.event--school {{school}}
</template>

<script>
/* eslint-disable */

    import randomColor from 'randomcolor'
    // 1 hour block is 35px high
    const MINUTE_HEIGHT = 35 / 60

    export default {
        name: 'event',
        props: ['event'],
        data: function () {
            var top = (MINUTE_HEIGHT * (+this.event[4])) + 'px'
            var height = (MINUTE_HEIGHT * (+this.event[5])) + 'px'
            var backgroundColor = randomColor({
                luminosity: 'light',
                hue: 'blue',
                seed: event[0]
            })


            var range = this._time(+this.event[4], +this.event[5])
            var school = this.event[6]

            return {
                top,
                height,
                backgroundColor,
                range,
                school
            }
        },
        methods: {
            _time (start, length) {
                var end = start + length

                var s_hr = ~~(start / 60) + 6
                var s_mn = start % 60

                var e_hr = ~~(end / 60) + 6
                var e_mn = end % 60

                return s_hr + ':' + s_mn + ' - ' + e_hr + ':' + e_mn
            }
        }
    } 
</script>

<style scoped>
    .event {
        width: 100%;
        background-color: #999;
        border-radius: 10px;
        position: absolute;
        font-size: 12px;
    }
        .event--time {
            font-weight: 600;
            font-size: 11px;
            margin: 5px;
            letter-spacing: 1px;
            width: 100%;
            text-align: left;
        }
        .event--school {
            width: 100%;
            margin-top: 0px;
            text-align: left;
            padding-left: 5px;
        }

</style>