<template lang="jade">
    #login__wrap
        #login__box
            .login__header LOGIN
            .login__info Please enter the master password!
            input.login__input(type="password" placeholder="Enter Password")
</template>

<script>
    /* eslint-disable */

    export default {
        name: 'login',
        components: {
        },
        data () {
            return {
                days: '.'.repeat(31).split('').map((a,i) => (i + 1))
            }
        }
    }

    
</script>

<style scoped>
    #login__wrap {
        position: fixed;
        top: 0px;
        left: 0px;
        height: 100%;
        width: 100%;
        background: url('../assets/doodles.png'), #1E8BC3;
    }
        #login__box {
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: -150px;
            margin-left: -150px;
            width: 300px;
            height: 200px;
            background-color: rgba(255, 255, 255, 1);
            box-shadow: 0px 1px 1px #DDD;
            border-radius: 3px;
            padding: 20px;
        }
            .login__header {
                font-family: Montserrat;
                font-size: 13px;
                letter-spacing: 1px;
                text-align: left;
                background-color: #4B77BE;
                color: #FFF;
                position: absolute;
                top: 0px;
                left: 0px;
                width: 100%;
                padding: 10px;
                font-weight: 200;
                box-sizing: border-box;
                border-top-left-radius: 10px;
                border-top-right-radius: 10px;
            }
            .login__info {
                width: 200px;
                font-family: Montserrat;
                font-weight: 400;
                font-size: 10px;
                color: #666;
                margin: 40px auto;
                margin-top: 70px;
                text-align: center;
            }
            .login__input{
                padding: 15px;
                border-radius: 5px;
                border: 1px solid #EEE;
                font-family: Montserrat;
                font-size: 12px;
                width: 180px;
                text-align: center;
                outline: 0;
            }
</style>
