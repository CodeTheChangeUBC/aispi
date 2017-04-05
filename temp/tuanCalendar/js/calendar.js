const MONTHS = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"]
const DAYS = ["SUNDAY","MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY"]



var Calendar = new Vue({
	el: '.container',
	data: {
		days: DAYS,
		currentMonth: 3,
		months: MONTHS
	},
	methods: {
		goForward: null,
		goBackward: null
	}
})



Calendar.goForward = function () {
	this.currentMonth = (this.currentMonth + 1) % 12
}

Calendar.goBackward = function () {
	this.currentMonth = (this.currentMonth - 1) % 12
}