
// From now on we will use a single object as the truth.
// All Vue objects will use this to load information.
var Truth = {
  UTILS:          UTILS,
  currentMonth:   new Date().getMonth(),
  currentYear:    new Date().getYear() + 1900,
  days:           [],
  update:         null
}


Truth.update = (function () {
  this.days = []

  // Make the year update gracefully.
  if (this.currentMonth > 10) {
    this.currentYear ++
    this.currentMonth = 0
  }
  else if (this.currentMonth < 0) {
    this.currentYear --
    this.currentMonth = 11
  }

  var days = UTILS.days(this.currentMonth, this.currentYear)
  var week = UTILS.week(this.currentMonth, this.currentYear)

  // Add the previous month's last week.
  for (var i = 0; i < week; i++) {
    this.days.push({
      number: 0,
      events: []
    })
  }

  // Add the appropriate amount of day objects to the day array.
  for (var i = 0; i < days; i++) {
    this.days.push({
      number: i + 1,
      events: []
    })
  }

}).bind(Truth)

Truth.update()

