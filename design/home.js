const MONTHS = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEPT','OCT','NOV','DEC']
const TIMES = [
  '6:00 am','7:00 am','8:00 am','9:00 am','10:00 am','11:00 am','12:00 on',
  '1:00 pm','2:00 pm','3:00 pm','4:00 pm','5:00 pm','6:00 pm','7:00 pm','8:00 pm', '9:00 pm'
]
const SWATCHES = [
  ['#5D9CEC', '#4A89DC'],
  ['#4FC1E9', '#3BAFDA'],
  ['#48CFAD', '#37BC9B'],
  ['#A0D468', '#8CC152'],
  ['#FFCE54', '#F6BB42'],
  ['#FC6E51', '#E9573F'],
  ['#ED5565', '#DA4453'],
  ['#AC92EC', '#967ADC'],
  ['#EC87C0', '#D770AD'],
  ['#F5F7FA', '#E6E9ED'],
  ['#CCD1D9', '#AAB2BD'],
  ['#656D78', '#434A54']
]

var Calendar = new Vue({
  el: '.home__inline',
  data: {
    MONTHS: MONTHS,
    SWATCHES: SWATCHES,
    TIMES: TIMES,
    date: null,
    month: 0,
    year: 0,
    days: [],
    

    eventMap: {},
  },
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
    fetchEvents: null,  }
})

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
    this.days.push({number: (i+1), events: ['']})
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
  request.open('POST', 'http://localhost/get.php?start=' + start + '&end=' + end, true)

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

Calendar.setDate(new Date())