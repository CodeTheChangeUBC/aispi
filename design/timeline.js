var calendar=new Vue({
   el: '.viewPopup',
   data: {
      inView: true,
      times: [
       '6:00 am','7:00 am','8:00 am','9:00 am','10:00 am','11:00 am','12:00 am',
       '1:00 pm','2:00 pm','3:00 pm','4:00 pm','5:00 pm','6:00 pm','7:00 pm','8:00 pm', '9:00 pm'
      ],
      bookedEvent = {
        name: 'asasd',
        startTime: '6:00 am',
        length: '120'
      }
   },
   methods: {
    toggleTimeLine: function(e){
      if(e && document.getElementById('keepTimeline').contains(e.target)){
        return
      }
      calendar.inView = !calendar.inView  
    },  
  }
})
var height = bookedEvent.length/60*20;
var start = '10vh'+ times.indexOf(bookedEvent.startTime)*20
console.log(height)
console.log(start)