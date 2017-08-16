<head><meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<template lang='jade'>
  div.viewPopup(v-show="inView" v-on:click='toggleTimeLine($event)')
    div.container#keepTimeline
      div.time__container
        div.time(v-for='time in times') {{time}}
      div.event__container
        div.events(v-bind:style="{top: event.top + '%', height: event.length + '%'  }" v-for='event in bookedEvent') {{event.name}}
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
          input(type="submit" id='submit')
</template>

<script>
  export default{
    name: 'popUp',
    data () {
      return {
        inView: false,
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
      width: 910px;
      height: 100%;
      margin: auto;
      margin-top: 10vh;
    }
      .time__container{
        width: 300px;
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
        width: 300px;
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
        height: 80vh;
        width: 610px;
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
              height: 20px;
              border: none;
              border-radius: 5px;
              font-size: 15px;
            }
            #submit{
              position: absolute;
              bottom: 5%  ;
              right: 20%;
              color: #fff;
              width: 80px;
              height: 30px;
              background-color: #446CB3;
              font-size: 15px;
            }
            textarea{
              width: 70%;
              height: 40px;
              border: none;
              border-radius: 5px;
            }
            .radioWrap{
              flex: 1;
            }
              .radioWrap input{
                width: auto;
                margin-right: 5px;
              }
</style>
