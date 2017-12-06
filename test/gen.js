var casual = require('casual')
var fs = require('fs')

const SCHOOLS = ["Allen East High School","Bath High School","Bluffton High School","Elida High School","Jefferson High School","Lima Central Catholic High School","Lima Senior High School","Perry High School","St. John's High School","Shawnee High School","Spencerville High School","Temple Christian School"]

const DAY_LEN = 1000 * 60 * 60 * 24 // 1 day in ms 

const FREQUENCY_BY_INDEX = ('0'.repeat(50) + '1'.repeat(35) + '2'.repeat(10) + '3'.repeat(5))
.split('').map(i => +i)

const DATE_START = new Date(process.argv[2])
const DATE_END = new Date(process.argv[3])
const TYPES = ['GC','PD']

var id = 0
var events = []

for (var i = DATE_START.getTime(); i <= DATE_END.getTime(); i+= DAY_LEN) {
    console.log(DATE_START.getTime(),DATE_END.getTime(),i)
    var date = new Date(i)
    var day = date.getDate()
    var month = date.getMonth()
    var year = date.getYear() + 1900
    for (var n = FREQUENCY_BY_INDEX[~~(Math.random() * 100)];n--;) {
        var type = TYPES[~~(Math.random()*2)]
        var school = SCHOOLS[~~(Math.random() * SCHOOLS.length)]
        var start = 480
        var length = 0
        //id,day,month,year,start,length,school,address,email,description,type
        events.push([id++,
            day,
            month,
            year,
            start,
            length,
            school,
            "324 Somewhere st",
            casual.email,
            casual.description.replace(/[^\w\s]/g, '')
            ,type].join(','))
    }
}


fs.writeFileSync('../events.csv', events.join('\n'))
