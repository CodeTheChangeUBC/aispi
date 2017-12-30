/*eslint-disable */


const URL = ''

// Abstractions for events on the API

export default class Event {
    static collides (events, start, length) {
        // Convert "start" to minutes
        var [h,m] = start.split(':')
        var start = h*60 + (~~m)
        var end = start + (length * 60)

        console.log()
        for (var i = events.length; i--;) {
            // Fetch the range of the start and end/
            var start2 = +events[i][4]
            var end2 = start2 + (+events[i][5])
            // Look for a collision
            // Taken from my scheduling algo
            if((((start2>=start)&&(start2<end))||((end2>start)&&(end2<end)))||(((start>=start2)&&(start<end2))||((end>start2)&&(end<end2)))) {
                return true
            }
        }

        return false
    }

    static post (args) {

        var postStr = ""
        // Create a string for posting.
        for(var key in args) {
            postStr += (key + '=' + args[key]) + '&'
        }
        
        return new Promise ((resolve, reject) => {
            var request = new XMLHttpRequest()
            request.open('POST', URL+'/api/post.php', true)
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')

            request.onload = function() {
                if (request.status >= 200 && request.status < 400) {
                    var data = JSON.parse(request.responseText)
                    resolve(data.event)
                } else {
                    reject()
                }
            }

            request.send(postStr)
        })
    }

    static fetch (month, year) {

        var cache = this.cache
        var cacheKey = month + '.' + year

        // Ew, what a mess..
        return new Promise((resolve, reject) => {

            // If we already have this, return it, else AJAX this.
            if (cache[cacheKey]) {
                return resolve(cache[cacheKey])
            }

            // Bare Bones AJAXing XMLHttpRequest masterrace..
            var request = new XMLHttpRequest()
            request.open('GET',URL+`/api/get.php?month=${month}&year=${year}`, true)
            request.onload = function() {
                var data
                try {
                    data = JSON.parse(request.responseText)
                } catch (e) {
                    reject({
                        message: 'Could not parse server data...'
                    })
                }
                if (request.status >= 200 && request.status < 400) {
                    data = JSON.parse(request.responseText)
                    cache[cacheKey] = data
                    // Update the holder
                    resolve(data)
                } else {
                    reject({
                        message: data.message
                    })
                }
            }

            request.onerror = function() {
                reject({
                    message: 'Error: Could not connect to server..'
                })
            }

            request.send()
        })
    }
}


Event.cache = {}
