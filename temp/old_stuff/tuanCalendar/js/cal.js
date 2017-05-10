const MONTHS = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"]
const DAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]



var Calendar = new Vue({
	el: '.calendar',
	data: {
		dates: '.'.repeat(30).split('').map((a,i) => (i+1)),
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