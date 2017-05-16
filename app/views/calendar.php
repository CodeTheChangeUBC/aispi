<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">

  </head>
  <body>
    <div class="container">
      <div class="calendar">
        <div class="header">
          <img src="logo.png" alt="">
          <div class="months">
            <div class="year" id="year">{{year}}</div>
            <!-- <div class="left" id="left" v-on:click="goBackward()">&#10094;</div>
            <div class="right" id="right" v-on:click="goForward()">&#10095;</div> -->
            <div class="month" id="months" >{{month}}</div>
          </div>
        </div>
        <div class="dates">
          <div class="date" v-for="date in dates">{{date}}</div>
        </div>
        <div class="days">
          <div class="day" v-for="day in days" v-on:click="toggleTimeLine">{{day}}</div>
        </div>
      </div>
      <div class="timeLine">
        <div class="time" v-for='time in times'>{{time}}</div>
      </div>
    </div>
    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.2.6/vue.min.js" type="text/javascript"></script>
    <script src="calendar.js"></script>
  </body>
</html>