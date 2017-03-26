# addEvent
---
Adds an event to the event database. Also verifies that a person has created the event and that the event can fit.

* **URL**
`/event/edit`
* **Method:**
`POST`
* **URL Params**
  * **Required:**
    * `type=[Enum("PD","GC")]`
    * `school=[String]`
    * `address=[String]`
    * `email=[String(Valid Email)]`
  * **Optional**
    * `description=[String]`
* **Success Response**
  * **Code:** 200 <br>
  **Content:** `{EVENT}`
* **Error Response**
  * **Code:** 200 <br>
  **Content:** `{error: "Invalid Email"}`