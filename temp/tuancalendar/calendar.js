
var DATES = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
var DAYS = []
var d = new Date()
var currentDate=d.getDate()
var currentYear=d.getFullYear()
var currentMonth=d.toString().substr(4,4)
var lastDate= new Date(currentYear, d.getMonth()+1, 0).getDate()
var firstDay=new Date(currentYear,d.getMonth(),1).toString().substr(0,3)
var firstDayNumber=DATES.indexOf(firstDay)
console.log(firstDayNumber)
//add spaces
for (c=0; c<=6; c++){
	if(c==firstDayNumber){
		break;
	}
	DAYS.push('')
}
//add dates
for (i=1;i<=lastDate;i++){
	DAYS.push(i)
}

var Calendar = new Vue({
	el: '.container',
	data: {
		dates: DATES,
		month: currentMonth,
		days: DAYS,
		year: currentYear
	},
	/*methods: {
		goForward: null,
		goBackward: null
	}*/
})
/*Calendar.goForward = function () {
	this.currentMonth = (this.currentMonth + 1) % 12
}
Calendar.goBackward = function () {
	this.currentMonth = (this.currentMonth - 1) % 12
}*/