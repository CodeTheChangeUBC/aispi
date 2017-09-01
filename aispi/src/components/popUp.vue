<template lang='jade'>
  div.viewPopup(v-show="viewable" @click.self="close($event)")
    div.container#keepTimeline
</template>

<script>
  /* eslint-disable */
  import VueRecaptcha from 'vue-recaptcha'

  export default {
    name: 'PopUp',
    props: ['viewable','events'],
    components: {
      VueRecaptcha
    },
    methods: {
      close: function () {
        this.$emit('close')
      }
    },
    data () {
      console.log(this)
      return {
        times: [
          '6:00 am', '7:00 am', '8:00 am', '9:00 am', '10:00 am', '11:00 am', '12:00 am',
          '1:00 pm', '2:00 pm', '3:00 pm', '4:00 pm', '5:00 pm', '6:00 pm', '7:00 pm', '8:00 pm', '9:00 pm'
        ],
        bookedEvent: [
        ]
      }
    },
    created () {
      for (var i = 0; i < this.bookedEvent.length; i++) {
        this.bookedEvent[i].length = this.bookedEvent[i].interval * 80 / 960
        this.bookedEvent[i].top = this.times.indexOf(this.bookedEvent[i].startTime) * 80 / 16
      }
    }
  }
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Montserrat:200,400');

</style>
