# aispi
Project for Animals in Science Policy Institute

View API Documentation [HERE](docs/api.md)


## How to start this...

1. Go Download [XAMPP](https://www.apachefriends.org/index.html)
2. Edit the Apache config.
  - Click on the `Config` button
  - Click on `Apache(httpd.conf)`
3. Find the section were the line begins with `DocumentRoot`
4. Edit the that line and the line below it to point to this git directory, it should look something like this in the end:
  ```
  DocumentRoot "C:/aispi"
  <Directory "C:/aispi">
  ```
5. Save the config file and Start the Apache Server. 
6. Open localhost in your browser

## Technical Specifications:
### Server
  - No need for databases, instead we're going to use a flat file as a csv
  - Flat files last for 1 year. Consider moving old csv's to another folder for yearly storage
  - Written in PHP, with nothing external other than the script
  - Hardcoded backend with password to edit events
  - Have some sort of token based authentication system for mail
  - Recaptcha backend
  - Send emails a week before

### Client
  - Have a Monthly View, that could go into a weekly view.
  - Have an adjacent form for entering and submittwing events.
  - Keep the colour scheme the same as the original website
  - Integrate Re-Captcha with the front end
  - Parsing csv data to fill in the calendar
  - Mandatory Fields for the form are as follows:
      * Event Type (Enumeration between "Guest Classes" and "Information Sessions (Pro-D)")
      * School
      * Address
      * Email
      * Description (Additional Info)
      * Start Time as Unix Timestamp
      * End Time