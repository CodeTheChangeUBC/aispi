/*eslint-disable */

// Abstractions for events on the API

export default class Event {
    constructor () {
        
    }

    static fetch (month, year) {
        var holder = this.Holder

        // Ew, what a mess..
        return new Promise((resolve, reject) => {

            var request = new XMLHttpRequest()
            request.open('GET', `http://localhost:3000/api/get.php?month=${month}&year=${year}`, true)

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
