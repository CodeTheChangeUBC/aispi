<html>
  <head>
    <link href="https://fonts.googleapis.com/css?family=Montserrat:200,400" rel="stylesheet">
    <style>
      body{
        background-color: #f3f3f3;
      }
      #submitForm{
        width: 300px;
        height: 590px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -295px 0 0 -150px;
        text-align: center;
      }
        .form__header{
          font-family: Montserrat;
          font-size: 30px;
          font-weight: 200;
          margin-bottom: 40px;
        }

        /** The normal text inputs styling. */
        .form__input{
          font-family: Montserrat;
          font-size: 12px;
          font-weight: 400;
          border: 0;
          padding: 15px;
          box-shadow: 0px 1px 3px rgb(148, 156, 161);
          border-radius: 3px;
          margin-top: 10px;
          outline: 0;
          width: 100%;
        }
          .form__input--area{
            height: 120px;
            resize: none;
          }

        /** That radio button styling. */
        .form__radioWrap{
          text-align: center;
          width: 100%;
          margin-top: 20px;
        }
          /** For each radio button, we use the following */
          .form__radio{
            margin: 10px;
            display: inline-block;
            cursor: pointer;
          }
            .form__radioBtn{
              height: 20px;
              width: 20px;
              border-radius: 30px;
              border: 5px solid rgba(148, 156, 161, 0.5);
              float: left;
            }
              .form__radioBtn--active{
                border-color: rgb(90, 64, 153);
              }
            .form__radioLbl{
              font-family: Montserrat;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              color: #000;
              font-size: 10px;
              float: right;
              line-height: 1;
              margin-top: 9px;
              margin-left: 10px;
              cursor: pointer;
            }

        /** Styling for all buttons. */
        .form__submit{
          padding: 12.5px 30px;
          font-family: Montserrat;
          border: 0;
          background-color: #b02b2c;
          border-radius: 5px;
          color: #FFF;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 1px;
          margin: auto;
          cursor: pointer;
          box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.5);
          margin-top: 30px;
        }

    </style>
  </head>
  <body>
    <form id="submitForm">
      <div class="form__header">School Deets</div>
      <input type="text" class="form__input" placeholder="School" />
      <br>
      <textarea type="text" class="form__input form__input--area" placeholder="Address"></textarea>
      <br>
      <input type="text" class="form__input" placeholder="Email" />
      <br>
      <textarea type="text" class="form__input form__input--area" placeholder="Additional Details"></textarea>
      <br>
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