# editEvent
---
Edits an event with the parameters provided, must be token authenticated.  Additionally, the event must conform to the specifications of the time.

* **URL**
`/event/add`
* **Method:**
`POST`
* **URL Params**
  * **Required:**
      * `token=[String(Valid Token)]`
  * **Optional**
      * `description=[String]`
      * `type=[Enum("PD","GC")]`
      * `school=[String]`
      * `address=[String]`
      * `email=[String(Valid Email)]`
* **Success Response**
  * **Code:** 200 <br>
  **Content:** `{"events":[{EVENT, ...}]}`
* **Error Response**
  * **Code:** 200 <br>
  **Content:** `{"error":"Invalid Token Provided."}`