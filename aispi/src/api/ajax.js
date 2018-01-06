

export default function AJAX (url) {
    return new Promise((resolve, reject) => {
        var request = new XMLHttpRequest()
        
        request.open('GET', url, true)

        request.onload = () => {

            // Reject if the server outputs an error
            if (request.status < 200 || request.status > 400) {
                reject({error: 'server error'})
            }

            // Attempt to parse the serve data, reject if not JSON
            try {
                let data = JSON.parse(request.responseText)

                // Fetch the appropriate callback, and execute it
                var cb = data.error
                    ? reject
                    : resolve

                cb(data)
            } catch (e) {
                reject({error: 'could not parse server data'})
            }
        }

        // Can't even reach the server, so we reject
        request.onerror = () => {
            reject({error: 'could not connect to server...'})
        }

        request.send()
    })
}
