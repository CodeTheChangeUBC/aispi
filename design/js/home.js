


// From now on we will use a single object as the truth.
// All Vue objects will use this to load information.
var Truth = {
  UTILS:        UTILS,
  currentMonth: new Date().getMonth(),
  currentYear:  new Date().getYear() + 1900,
  days:         []
}

// Fill in all the day objects
Truth.days =  new Array(UTILS.days(Truth.currentMonth, Truth.currentYear))
.fill(0)
.map((a,i) => ({
  number: i + 1,
  events: []
}))




// Set up the calendar for Vue to use properly.
var Calendar = new Vue({
  el: '.home__inline',
  data: Truth,
  methods: {
    toggleTimeLine: function(){
      calendar.inView = !calendar.inView
    },
    events: {
      extend: null,
      contract: null
    },
    months: {
      next: null,
      prev: null,
    },
    setDate: null,
    fetchEvents: null,
  }
})



/*





































Calendar.months = {}
Calendar.events = {}

Calendar.events.extend = function (event) {
  console.log('Move')
  event.toggled = true
  Calendar.$forceUpdate()
}

Calendar.events.contract = function (event) {
  console.log('Done')
  event.toggled = false
  Calendar.$forceUpdate()
}

Calendar.months.next = function () {
  // Update variables.
  Calendar.month += 1
  if (Calendar.month > 12) {
    Calendar.month = 0
    Calendar.year += 1
  }

  // Construct a date at the beginning of next month.
  var date = new Date(Calendar.year, Calendar.month)
  // Update it
  Calendar.setDate(date)
}


Calendar.months.prev = function () {
  // Update variables.
  Calendar.month -= 1
  if (Calendar.month < 0) {
    Calendar.month = 12
    Calendar.year -= 1
  }
  
  // Construct a date at the beginning of last month.
  var date = new Date(Calendar.year, Calendar.month)
  // Update it
  Calendar.setDate(date)

}

Calendar.setDate = function (date) {
  // Clear the days.
  this.days = []
  var year = date.getYear() + 1900
  var month = date.getMonth()

  // Grab some day information.
  var days = new Date(year, month, 0).getDate()
  var dayOf = new Date(year, month).getDay()

  // Fill in the appropriate array.
  for(var i = 0; i < days; i++) {
    this.days.push({number: (i+1), events: []})
  }

  // Beginning empty
  for(var i = 0; i < dayOf; i++) {
    this.days.unshift({number: 0, events: []})
    
  }

  while (this.days.length%7) {
    this.days.push({number: 0, events: []})
  }

  this.date = date
  this.month = date.getMonth()
  this.year = date.getYear() + 1900


  this.fetchEvents(year, month)
}

Calendar.fetchEvents = function (year, month) {
  var self = this

  // Calculate the starting and ending timestamps.
  var end = ~~(new Date(year, month, 1).getTime() / 1000)
  var start = ~~(new Date(year, month, 0).getTime() / 1000)

  // Start the AJAX request.
  var request = new XMLHttpRequest()
  request.open('POST', 'http://localhost/api/get.php?start=' + start + '&end=' + end, true)

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      var data = JSON.parse(request.responseText)

      self.days.forEach(function (day) {
        if (!day.number) {
          return
        }
        var start = new Date(self.year, self.month, day.number - 1)
        start.setHours(0,0,0,0)
        start = ~~(start.getTime() / 1000)
        
        var end = new Date(self.year, self.month, day.number - 1)
        end.setHours(23,59,59,999)
        end = ~~(end.getTime() / 1000)

        day.events = data.filter((event) => ((+event[1]) >= start && end >= (+event[1])))
        Calendar.$forceUpdate()
      })

    }
  }

  request.send()
}

Calendar.setDate(new Date())*/