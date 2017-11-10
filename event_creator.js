
var fs = require('fs')

const START = new Date(2016, 0, 1)
const END = new Date(2018, 0, 1)
// FIELDS: id,day,month,year,start,length,school,address,email,description,type

function randRow() {
    var date = new Date(START.getTime() + Math.random() * (END.getTime() - START.getTime()))

    return [
       ~~( Math.random() * (2 ** 30)),
        date.getDate(),
        date.getMonth(),
        date.getYear()+1900,
        ~~(Math.random() * 600),
        ~~(Math.random() * 4),
        "blah school",
        "blah street",
        "joe@gmail.com",
        "You are joe",
        "GC"
    ].join(',')

}


for(var i = 0; i < 1000; i++) {
    fs.appendFile('./events.csv','\n'+randRow(), (err) => {

    })
}






