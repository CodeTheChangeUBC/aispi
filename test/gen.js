
const json2csv = require('json2csv')
const casual   = require('casual')
const uuid     = require('uuid')
const fs       = require('fs')


const DAY_LEN = 1000 * 60 * 60 * 24
const YEAR    = DAY_LEN * 7 * 52

const SCHOOLS = ["Allen East High School","Bath High School","Bluffton High School","Elida High School","Jefferson High School","Lima Central Catholic High School","Lima Senior High School","Perry High School","St. John's High School","Shawnee High School","Spencerville High School","Temple Christian School"]
const FIELDS  = ['id','day','month','year','start','length','school','address','email','description','type']
const TYPES   = ['GC','PD']

const NOW = new Date()
NOW.setHours(0)
NOW.setMinutes(0)
NOW.setSeconds(0)
NOW.setMilliseconds(0)

const DATE_START = NOW.getTime() - YEAR
const DATE_END   = NOW.getTime() + YEAR

var events = []
var id = 0

for (var i = DATE_START; i <= DATE_END; i+= DAY_LEN) {
    var n = ~~(Math.random() * 10)

    // Select the number of events for this day based on this distribution.
    // | 0 1 2 3 4 5 | 6 7 8 | 9 |
    if (n < 6) { n = 1 }
    else if (n < 9) { n = 0 }
    else { n = 2}

    var today = new Date(i)
    var day = today.getDate()
    var month = today.getMonth() + 1
    var year = today.getYear() + 1900
    var school = SCHOOLS[~~(SCHOOLS * Math.random())]
    // Iterate n times
    for (n; n--;) {
        events.push({
            id:          uuid.v1(),
            day,
            month,
            year,
            school,
            start:       ~~(Math.random() * (24 * 60)),
            length:      60,
            address:     casual.address,
            email:       casual.email,
            description: casual.sentences(n),
            type:        TYPES[~~(TYPES.length * Math.random())]
        })

    }
}


fs.writeFileSync('events.csv', json2csv({data: events, fields: FIELDS}))
