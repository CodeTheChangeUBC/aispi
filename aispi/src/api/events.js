/*eslint-disable */


const URL = 'http://127.0.0.1:3000'

// Abstractions for events on the API

export default class Event {
    constructor () {

        
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
            request.send(postStr)
            resolve()
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
