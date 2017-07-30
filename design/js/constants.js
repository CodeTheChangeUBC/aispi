
const UTILS = {
  DAYS: [
    "SUN",
    "MON",
    "TUE",
    "WED",
    "THU",
    "FRI",
    "SAT"
  ],

  MONTHS: [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEPT',
    'OCT',
    'NOV',
    'DEC'
  ],

  TIMES: [
    '6:00 am',
    '7:00 am',
    '8:00 am',
    '9:00 am',
    '10:00 am',
    '11:00 am',
    '12:00 on',
    '1:00 pm',
    '2:00 pm',
    '3:00 pm',
    '4:00 pm',
    '5:00 pm',
    '6:00 pm',
    '7:00 pm',
    '8:00 pm', 
    '9:00 pm'
  ],

  SWATCHES: [
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
}

UTILS.days = function (month, year) {
    return new Date(year, month + 1, 0).getDate()
}
UTILS.week = function (month, year) {
    if (month == 0) {
        month = 12
        year--
    }
    return new Date(year, month, 1).getDay()
}






