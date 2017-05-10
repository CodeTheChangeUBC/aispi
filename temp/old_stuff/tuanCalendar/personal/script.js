window.onload = function main() {
   var d = new Date()
   var monthName = ['January','February','March','April','May','June','July','August','September','October','November','December']
   var month = d.getMonth()
   var year = d.getFullYear()
   var lastDate=new Date(year,month+1,0).getDate()
   var dates=['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
   var dFirst=new Date(year,month,1)
   var dString=dFirst.toString() 
   var firstDay=dString.substr(0,3)
   var dayNumber=dates.indexOf(firstDay)
   var getDays = buildDays()
   var getDates = buildDates(lastDate, dayNumber)
   document.getElementById('monthYear').innerHTML=monthName[month]+" "+year //add current month and year
   document.getElementById('days').appendChild(getDays)
   document.getElementById('dates').appendChild(getDates)
   var a=document.getElementById('timeLineToggle')
   var b=document.getElementsByClassName('date')[0]
   b.addEventListener('click',function(){
      toggle()
   })
}
function buildDays(){
   var daysContainer = document.createElement('div')
   //add the days
   for (var i = 0; i <= 6; i++) {
      var div = document.createElement('div')
      div.innerHTML="SMTWTFS"[i]
      daysContainer.appendChild(div)
      div.className += "day"
   }
   return daysContainer
}
function buildDates(lastDate, dayNumber) {
   var datesContainer=document.createElement('div')
   //add space before first date
   var c
   for(c=0; c<=6; c++){
      if(c==dayNumber){
         break;
      }
      var space=document.createElement('div')
      space.className+="space"
      space.innerHTML="&nbsp;"
      datesContainer.appendChild(space)
   }
   //add the dates
   for (var i=1; i<=lastDate; i++){
      var div=document.createElement('div')
      div.className+="date"
      div.innerHTML=[i]
      datesContainer.appendChild(div)
   }
   return datesContainer
}
function toggle(){
   var s = 3
   console.log(s)
}
  
