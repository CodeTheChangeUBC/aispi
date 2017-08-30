<template lang='jade'>
  div.viewPopup(v-show="viewable" @click.self="close($event)")
    div.container#keepTimeline
      div.time__container
        div.time(v-for='time in times') {{time}}
      div.event__container
        div.events(v-for='event in events') {{event[7]}} {{event[8]}} {{event[9]}}
      div.form__container
        div.form__header Book Event
        input(placeholder="School Name*").text__input
        textarea(placeholder="Address*").text__input
        input(placeholder="Contact Email*").text__input
        textarea(placeholder="Additional Details").text__input
        vue-recaptcha(sitekey="6LdxTi4UAAAAALdEW9pPOkXtQSg0jlfXqAM2tcSI").recaptcha__input
        div * Asterices indicate required fields.
        input(type="submit" value="CREATE").form__submit
</template>

<script>
  /* eslint-disable */
  import VueRecaptcha from 'vue-recaptcha'

  export default {
    name: 'popUp',
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
  .close {
    height: 20px;
    width: 20px;
    border-radius: 10px;
    background-color: #FFF;
  }
  .viewPopup{
    z-index: 999;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0,0,0,0.8);
  }
    .container{
      font-family: Montserrat;
      z-index: 1;
      width: 910px;
      height: 100%;
      min-height: 910px;
      margin: auto;
      margin-top: 10vh;
    }
      .time__container{
        width: 300px;
        position: absolute;
        height: 100%;
      }
        .time{
          background-color: #666;
          color: #fff;
          width: 100%;
          height: calc(100%/16);
          text-align: left;
          padding-left: 10px;
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 300;
          flex-direction: column;
          border-top: 1px solid rgba(255,255,255,0.02);
        }
      .event__container{
        position: absolute;
        width: 300px;
        height: 100%;
      }
        .events{
          position: absolute;
          width: 78%;
          background-color: rgba(255,255,255,0.1);
          color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: 200;
          font-size: 13px;
          text-align: right;
          right: 0;
        }
      .form__container{
        float: right;
        height: 80vh;
        width: 610px;
        color: #fff;
        position: relative;
        text-align: center;
        background-color: #CCC;
      }
        .form__header {
          font-family: Montserrat;
          font-size: 40px;
          font-weight: 100;
          text-align: left;
          width: 60%;
          margin: auto;
          margin-bottom: 50px;
          margin-top: 20px;
          text-align: center;
        }
        .text__input {
          padding: 10px;
          border: 0;
          outline: 0;
          border-radius: 3px;
          width: 60%;
          font-family: Montserrat;
          margin: 2px;
          font-size: 12px;
        }
          textarea.text__input{
            resize: none;
            height: 60px;
          }
        .recaptcha__input{
          margin: auto;
          display: inline-block;
        }
        .form__submit{
          padding: 10px 20px;
          border: 0;
          background-color: #FFF;
          color: #000;
          border-radius: 4px;
          font-size: 12px;
          letter-spacing: 1px;
          font-family: Montserrat;
          margin-top: 20px;
          cursor: pointer;
          outline: 0;
        }
</style>
