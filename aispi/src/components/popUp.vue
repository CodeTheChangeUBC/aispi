<template lang='jade'>
    div.viewPopup(v-show="inView" v-on:click='toggleTimeLine($event)')
      div.container#keepTimeline
        div.time__container
          div.time(v-for='time in times') {{time}}
        div.event__container
          div.events(v-bind:style="{top: eventTop + '%', height: eventLength + '%'  }" v-for='event in bookedEvent') {{event.name}}
        div.form__container
          div.textContainer
            div.text(v-for="text in texts") {{text}}
          div.inputWrap
            div.input
              div.radioWrap
                input(type="radio")
                | Guess Classes
              div.radioWrap
                input(type="radio")
                | Information Sessions
            div.input
              input(type="text")
            div.input
              input(type="text")
            div.input
              input(type="text")
            div.input
              input(type="time")
            div.input
              input(type="time")
            div.input
              textarea
</template>

<script>
  export default{
    name: 'popUp',
    data () {
      return {
        inView: true,
        times: [
          '6:00 am', '7:00 am', '8:00 am', '9:00 am', '10:00 am', '11:00 am', '12:00 am',
          '1:00 pm', '2:00 pm', '3:00 pm', '4:00 pm', '5:00 pm', '6:00 pm', '7:00 pm', '8:00 pm', '9:00 pm'
        ],
        texts: [
          'Event Type', 'School Name', 'Address', 'Email', 'Start time', 'End time', 'Description'
        ],
        bookedEvent: [
          {
            name: 'Vancouver School',
            startTime: '9:00 am',
            interval: '60',
            top: '',
            length: ''
          },
          {
            name: 'ubc',
            startTime: '2:00 pm',
            interval: '120',
            top: '',
            length: ''
          },
          {
            name: 'sfu',
            startTime: '5:00 pm',
            interval: '120',
            top: '',
            length: ''
          }
        ]
      }
    },
    computed: {
      eventLength: function () {
        for (var i = 0; i < this.bookedEvent.length; i++) {
          return this.bookedEvent[i].interval * 80 / 960
        }
      },
      eventTop: function () {
        for (var i = 0; i < this.bookedEvent.length; i++) {
          return this.times.indexOf(this.bookedEvent[i].startTime) * 80 / 16
        }
      }
    }
  }

</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Montserrat:200,400');
  .viewPopup{
    z-index: 999;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(108,122,137,0.8);
  }
    .container{
      font-family: Montserrat;
      z-index: 1;
      width: 50%;
      height: 80%;
      margin: auto;
      margin-top: 10vh;
    }
      .time__container{
        width: 20vw;
        position: absolute;
        height: 80vh;
      }
        .time{
          background-color: rgba(34, 49, 63,1);
          color: #fff;
          width: 100%;
          height: calc(100%/16);
          text-align: left;
          padding-left: 10px;
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 300;
          flex-direction: column;
          border-top: 1px solid rgba(255,255,255,0.02);
        }
      .event__container{
        position: absolute;
        width: 20vw;
        height: 100%;
      }
        .events{
          position: absolute;
          width: 100%;
          background-color: rgba(236,100,75,0.5);
          color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      .form__container{
        float: right;
        height: 100%;
        width: 30vw;
        background-color: #2C3E50;
        color: #fff;
        position: relative;
      }
        .textContainer{
          height: 100%;
          width: 30%;
          position: absolute;
          left: 0;
          display: flex;
          flex-direction: column;
        }
          .text{
            flex: 1;
            text-align: left;
            padding: 10px 0 0 10px
          }
          .text:nth-child(7){
            flex: 2.5;
          }
        .inputWrap{
          height: 100%;
          width: 70%;
          float: right;
          display: flex;
          flex-direction: column;
        }
          .input{
            flex: 1;
            padding-top: 10px;
            text-align: left;
          }
          .input:nth-child(1){
            display: flex;
            flex-direction: row;
          }
          .input:nth-child(7){
            flex: 2.5;
          }
            input{
              width: 70%;
              border: none;
            }
            textarea{
              width: 70%;
            }
            .radioWrap{
              flex: 1;
              text-align: center;

            }
              .radioWrap input{
                width: auto;
                margin-right: 5px;
              }
@media only screen and (max-width: 500px) {
    .container {
      width: 100%;
    }
    .time__container{
      width: 30%;
    }
    .event__container{
      width: 30%;
    }
    .form__container{
      width: 70%;
    }
}

</style>
