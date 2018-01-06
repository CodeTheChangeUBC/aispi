/*eslint-disable */


const URL = 'http://127.0.0.1:3000'

// Abstractions for events on the API

export default class Event {
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

                var data
                try {
                    data = JSON.parse(request.responseText)
                } catch (e) {
                    reject({
                        error: 'Could not parse server data...'
                    })
                    return
                }
                
                if (request.status >= 200 && request.status < 400) {
                    if (data.error) {
                        reject(data)
                    } else {
                        resolve(data)
                    }

                } else {
                    reject()
                }
            }

            request.send(postStr)
        })
    }

    static fetch () {
        // If argument[1] isn't set, this is NBest, else it's a month thing
        if (arguments[1]) {
            return _fetchByMonth(arguments[0], arguments[1])
        } else {
            return _fetchNBest(arguments[0])
        }
    }
    
    static _fetchNBest (n) {
        var cache = this.cache
        var cacheKey = 'best-' + n

        return new Promise((reolve, reject) => {

            // If we already have this, return it, else AJAX this.
            if (cache[cacheKey]) {
                return resolve(cache[cacheKey])
            }

            // Bare Bones AJAXing XMLHttpRequest masterrace..
            var request = new XMLHttpRequest()
            request.open('GET', URL+`/api/get.php?month=${month}&year=${year}`, true)
            request.onload = function() {
                var data
                try {
                    data = JSON.parse(request.responseText)
                } catch (e) {
                    reject({
                        error: 'Could not parse server data...'
                    })
                    return
                }
                if (request.status >= 200 && request.status < 400) {
                    cache[cacheKey] = data
                    // Update the holder
                    resolve(data)
                } else {
                    reject({
                        error: data.message
                    })
                }
            }

            request.onerror = function() {
                reject({
                    error: 'Error: Could not connect to server..'
                })
            }

            request.send()

        })
    }

    static _fetchByMonth (month, year) {

        var cache = this.cache
        var cacheKey = month + '.' + year

        return new Promise((resolve, reject) => {

            // If we already have this, return it, else AJAX this.
            if (cache[cacheKey]) {
                return resolve(cache[cacheKey])
            }

            // Bare Bones AJAXing XMLHttpRequest masterrace..
            var request = new XMLHttpRequest()
            request.open('GET', URL+`/api/get.php?month=${month}&year=${year}`, true)
            request.onload = function() {
                var data
                try {
                    data = JSON.parse(request.responseText)
                } catch (e) {
                    reject({
                        error: 'Could not parse server data...'
                    })
                    return
                }
                if (request.status >= 200 && request.status < 400) {
                    cache[cacheKey] = data
                    // Update the holder
                    resolve(data)
                } else {
                    reject({
                        error: data.message
                    })
                }
            }

            request.onerror = function() {
                reject({
                    error: 'Error: Could not connect to server..'
                })
            }

            request.send()
        })
    }
}


Event.cache = {}
