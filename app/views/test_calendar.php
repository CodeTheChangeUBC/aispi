<html>
  <head>
    <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
    <style>
      .form__input{
        font-family: Montserrat;
        font-size: 12px;
        s
      }
    </style>
  </head>
  <body>
    <form id="submitForm">
      <input type="text" class="form__input" placeholder="School" />
      <input type="text" class="form__input" placeholder="Address" />
      <input type="text" class="form__input" placeholder="Email" />
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