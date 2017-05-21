const MONTHS = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEPT','OCT','NOV','DEC']

var Calendar = new Vue({
  el: '#calendar__wrap',
  data: {
    current: null,
    month: '',
    year: 0,
    days: [],
    eventMap: {},
    times: [
    '6:00 am','7:00 am','8:00 am','9:00 am','10:00 am','11:00 am','12:00 on',
    '1:00 pm','2:00 pm','3:00 pm','4:00 pm','5:00 pm','6:00 pm','7:00 pm','8:00 pm', '9:00 pm'
    ]
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