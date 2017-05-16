<html>
  <head>
    <link href="https://fonts.googleapis.com/css?family=Montserrat:200,400" rel="stylesheet">
    <link href="/app/static/form.css" rel="stylesheet">
  </head>
  <body>
    <form id="submitForm">
      <div class="form__header">School Deets</div>
      <input class="form__input" placeholder="School" />
      <textarea class="form__input form__input--area" placeholder="Street Address"></textarea>
      <input class="form__input" placeholder="Email" />
      <textarea class="form__input form__input--area" placeholder="Additional Details"></textarea>
      <div class="form__radioWrap">
        <div class="form__radio">
          <div class="form__radioBtn form__radioBtn--active">
          </div>
          <label class="form__radioLbl">Pro-D Day</label>
        </div>
        <div class="form__radio">
          <div class="form__radioBtn ">
          </div>
          <label class="form__radioLbl">Guest Class</label>
        </div>
      </div>
      <input type="submit" class="form__submit" value="SUBMIT"/>
    </form>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.2.6/vue.min.js"></script>
    <script type="text/javascript">
      var SubmissionForm = new Vue({
        el: '#submitForm',
        data: {

        }
      })
    </script>
  </body>
</html>