<template lang="jade">
    div.event__cover
        div(v-if="type=='label'")
            div.label__container(v-bind:style="{backgroundColor}")
                |12:30 am | Guest Event
        div(v-else)

</template>

<script>
/* eslint-disable */

    import randomColor from 'randomcolor'
    // 1 hour block is 35px high
    const MINUTE_HEIGHT = 35 / 60

    export default {
        name: 'event',
        props: ['event','type'],
        data () {
            var backgroundColor = randomColor({
                luminosity: 'light',
                hue: 'blue',
                seed: ~~(Math.random()*10000)
            })

            return {
                backgroundColor
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

<style scoped lang="sass">
.label__container
    padding: 5px 0px
    color: #FFF
    font-size: 10px


.event
    width: 100%
    background-color: #999
    border-radius: 10px
    position: absolute
    font-size: 12px

.event--time
    font-weight: 600
    font-size: 11px
    margin: 5px
    letter-spacing: 1px
    width: 100%
    text-align: left

.event--school
    width: 100%
    margin-top: 0px
    text-align: left
    padding-left: 5px

</style>