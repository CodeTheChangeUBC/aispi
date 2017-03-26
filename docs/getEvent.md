# getEvents
---
Get all the events past the current date (today). Can be limited to events before the end time. 

* **URL**
`/event/get`
* **Method:**
`GET`
* **URL Params**
  * **Optional**
      * `end=[Integer(UNIX Timestamp)]`
* **Success Response**
  * **Code:** 200 <br>
  **Content:** `{"events":[{EVENT, ...}]}`
* **Error Response**
  * **Code:** 200 <br>
  **Content:** `{"events":[]}`