var calendar=new Vue({
   el: '.viewPopup',
   data: {
      inView: false,
      times: [
       '6:00 am','7:00 am','8:00 am','9:00 am','10:00 am','11:00 am','12:00 am',
       '1:00 pm','2:00 pm','3:00 pm','4:00 pm','5:00 pm','6:00 pm','7:00 pm','8:00 pm', '9:00 pm'
      ],
      bookedEvent : [
      {
        name: 'Vancouver School',
        startTime: '9:00 am',
        interval: '60',
      },
      {
        name: 'ubc',
        startTime: '2:00 pm',
        interval: '120',
      },
      {
        name: 'sfu',
        startTime: '5:00 pm',
        interval: '120',
      },
      ],
   },
   methods: {
    toggleTimeLine: function(e){
      if(e && document.getElementById('keepTimeline').contains(e.target)){
        return;
      }
      calendar.inView = !calendar.inView;
    },   
  }
});

window.onload = function bookedEvent(){
  var startTime = [];
  var schoolName = [];
  var interval = [];
  for(i=0;i<calendar.bookedEvent.length;i++){
    startTime.push(calendar.bookedEvent[i].startTime);
    schoolName.push(calendar.bookedEvent[i].name);
    interval.push(parseInt(calendar.bookedEvent[i].interval)/60);
  }
  var timeLines = document.getElementsByClassName('time');
  for(i=0;i<timeLines.length;i++){
    var timeLine = timeLines[i].innerText;
    for(j=0;j<startTime.length;j++){
      if(timeLine==startTime[j]){
        timeLines[i].style.backgroundColor = 'rgb(236,100,75)'; 
        timeLines[i].innerHTML = schoolName[j]; 
        for(b=0;b<interval[j];b++){
          timeLines[i+b].style.backgroundColor = 'rgb(236,100,75)';
          timeLines[i+b].innerHTML = schoolName[j];
        }   
      }  
    }
  }
};