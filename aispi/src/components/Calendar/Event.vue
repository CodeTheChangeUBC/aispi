<template lang="jade">
    div.event__cover
        div(v-if="type=='label'")
            div.label__container(v-bind:style="{backgroundColor}")
                div(style="float: left;font-weight:600;margin-left: 5px;margin-right: 6px;") {{e_type}}
                div(style="height: 5px;width: 5px;float: left;margin-top: 4px;background-color: #663399;border-radius:3px;")
                div(style="float: left;margin-left: 6px")
                    {{e_desc}}
        div(v-else)
            .event__container
                .event__title {{event[6]}} :: {{e_type}}
                .event__time {{full}}
                .event__address {{event[9]}}
</template>

<script>
/* eslint-disable */

    // 1 hour block is 35px high
    const MINUTE_HEIGHT = 35 / 60

    export default {
        name: 'event',
        props: ['event','type'],
        data () {
            var backgroundColor = '#AAAAAA'
            var time = this._format(+this.event[4])
            var full = time + ' - ' + this._format((+this.event[4])+(+this.event[5]))
            var e_type = this.event[10]
            var e_desc = this.event[6]

            if (e_type == "PD") {
                e_type = "Pro-D Day"
            } else {
                e_type = "Guest Class"
            }

            return {
                backgroundColor,
                time,
                full,
                e_type,
                e_desc
            }
        },
        methods: {
            _format (start) {
                var s_hr = ~~(start / 60)
                var s_mn = (start % 60) + ""
                s_mn ='00'.substr(s_mn.length) + s_mn

                return s_hr + ':' + s_mn 
            }
        }
    } 
</script>

<style scoped lang="sass">

@import url('https://fonts.googleapis.com/css?family=Source+Serif+Pro');

.event__container
    padding: 15px
    display: inline-block
    box-shadow: 0px 1px 2px rgba(0,0,0,0.4)
    border-radius: 3px
    background-color: #FFF
    width: 90%
    margin: auto
.event__title
    font-family: Montserrat
    font-size: 12px
    font-weight: 800
    width: 100%
    text-align: center
    letter-spacing: 0.5px
    text-transform: uppercase
    float: left
.event__time
    width: 100%
    text-align: center
    font-size: 12px
    font-weight: 400
    font-family: Montserrat
    margin-top: 12px
    float: left
.event__address 
    font-size: 12px
    text-align: center
    font-family: Source Serif Pro
    margin-top: 10px
    float: left
    width: 100%

.label__container
    padding: 5px 0px
    color: #FFF
    font-size: 10px
    border-radius: 3px;
    margin-top: 1px;
    float: left;
    width: 100%;


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



.block__container
    padding: 5px
    width: calc(100% - 10px)
    display: inline-block
    border-radius: 3px
    box-shadow: 0px 1px 1px #999
    box-sizing: border-box
    margin: 5px

.block__event
    font-family: Montserrat
    font-size: 12px
    font-weight: 300
    letter-spacing: 1px
    margin: 5px
    text-transform: uppercase
    color: #FFF
    float: left

.block__time
    font-family: Helvetica
    font-size: 14px
    float: right
    width: 100%
    margin: 5px 0 10px 0
    color: #FFF

.block__description
    font-family: Montserrat
    font-size: 11px
    color: #FFF
    float: left

</style>