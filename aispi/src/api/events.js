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
            request.open('GET', '/api/get.php', true)

            request.onload = function() {
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
                    data.forEach(block => (holder[block.id] = block))
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
