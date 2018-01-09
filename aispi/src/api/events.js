/*eslint-disable */

import AJAX from '@/api/ajax'

const ROOT_URL  = 'http://127.0.0.1:3000'
const POST_URL  = ROOT_URL + '/api/post.php?'
const GET_URL   = ROOT_URL + '/api/get.php?'

// Abstractions for events on the API
export default class Event {
    constructor (form) {
        this._set = []

        for (var key in form) {
            this.update(key, form[key])
        }
    }

    update (key, value) {
        this._set[key] = value 
        console.log(key)
    }
    
    collides (time, length, events) {

        // Convert the time to minutes, and get the start/end 
        var s_ = (time.split(':')[0] * 60) + time.split(':')[1]
        var e_ = (length * 60) + s_

        // Make sure we're not colliding with any of the provided events.
        for (var i = events.length; i--;) {
            var t = events[i].start.split(':')
            var s = (t[0] * 60) + t[1]
            var e = s + (events[i].length * 60)

            // Checks collision, stolen from the scheduling app.
            if((((s_>=s)&&(s_<e))||((e_>s)&&(e_<e)))||(((s>=s_)&&(s<e_))||((e>s_)&&(e<e_)))) {
                return true
            }
        }

        return false
    }

    save () {
        let data = ''

        // Serialize our set keys.
        for (var keys in this._set) {   
            data += `${keys}=${this._set[keys]}&`
        }

        // 'length' attribute is ignored by JS but is used in our program. 
        data += `length=${this._set.length}`

        // Return our AJAX Promise
        return AJAX('POST', POST_URL, data)
    }

    static fetch () {
        var url = GET_URL

        // If argument[1] isn't set, this is n-Best, else it's a month thing
        if (arguments[1]) {
            url += `month=${arguments[0]}&year=${arguments[1]}`
        } else {
            url += `type=best&n=${arguments[0]}`
        }

        // Return the AJAX promise for the events.
        return AJAX('GET', url)
    }
}


Event.cache = {}
