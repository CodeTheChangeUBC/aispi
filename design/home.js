const MONTHS = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEPT','OCT','NOV','DEC']

var Calendar = new Vue({
  el: '.home__inline',
  data: {
    current: null,
    month: '',
    year: 0,
    days: [],
    eventMap: {},
  },
  methods: {
    toggleTimeLine: function(){
      calendar.inView = !calendar.inView
    }
  }
})

Calendar.getDay = function (day) {

}


Calendar.setDate = function (date) {
  this.current = date
  this.month = MONTHS[date.getMonth()]
  this.year = date.getYear() + 1900

  // A little neat way to get the number of days
  var maxDays = new Date(this.year, date.getMonth(), 0).getDate()
  var lastMonth = new Date(this.year, date.getMonth() - 1, 0)

  var lastMonthDay = lastMonth.getDay()
  var lastMonthDays = lastMonth.getDate()

  // if the last month didn't end in saturday, fill with disabled stuff.
  if (lastMonthDay != 6) {
    for (var i = (lastMonthDays - (6 - lastMonthDay)); i < lastMonthDays; i++) {
      this.days.push({
        current: false,
        number: i
      })
    }
  }

  // Add normal days for the current day
  for (var i = 1; i <= maxDays; i++) {
    this.days.push({
      current: true,
      number: i
    })
  }
}


Calendar.setDate(new Date())