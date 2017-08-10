<template lang="jade">
    #login__wrap
        #login__box
            .login__header LOGIN
            .login__info Please enter the master password!
            input.login__input(placeholder="Enter Password")
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
        background-color: #446CB3;
    }
        #login__box {
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: -150px;
            margin-left: -150px;
            width: 300px;
            height: 300px;
            background-color: #FFF;
            border-radius: 10px;
            padding: 20px;
        }
            .login__header {
                font-family: Montserrat;
                font-size: 30px;
                letter-spacing: 1px;
                text-align: left;
                color: #446CB3;
            }
            .login__info {
                width: 200px;
                font-family: Montserrat;
                font-weight: 400;
                font-size: 10px;
                color: #666;
                margin: 30px auto;
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
