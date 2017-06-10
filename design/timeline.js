var calendar=new Vue({
   el: '.viewPopup',
   data: {
      inView: false,
      times: [
       '6:00 am','7:00 am','8:00 am','9:00 am','10:00 am','11:00 am','12:00 am',
       '1:00 pm','2:00 pm','3:00 pm','4:00 pm','5:00 pm','6:00 pm','7:00 pm','8:00 pm', '9:00 pm'
      ],
   },
   methods: {
    toggleTimeLine: function(){
      calendar.inView = !calendar.inView  
    },  
  }
})