<template lang="jade">
    #login__wrap
        #login__box
            .login__header LOGIN
            .login__info {{heading}}
            input.login__input(type="password" placeholder="Enter Password" v-model="password" @keyup="start()" )
            br
            button.submit__button Go

</template>

<script>
    /* eslint-disable */
    import Hash from 'crypto-js'

    const SALT = 'Joe Thomas is Super Cool'
    const ITERATIONS = 100000
    const TYPING_SPEED = 1000

    export default {
        name: 'login',
        data () {
            return {
                heading: "Please enter the master password!",
                typingTimeout: null,
                password: '',
                days: '.'.repeat(31).split('').map((a,i) => (i + 1))
            }
        },
        
        methods: {
            start: function () {
                var self = this

                clearTimeout(this.typingTimeout)
                this.typingTimeout = setTimeout(() => {
                    console.log(Hash(self.password, SALT, ITERATIONS, 32))

                }, TYPING_SPEED)
            },
            submit: function () {
                var password = Hash
                .PBKDF2(this.password, SALT, {keySize: 8, iterations: ITERATIONS})
                .toString()
                
                this
                .$http
                .post('http://localhost:3000/login', {password: this.password})
                .then(a => {
                    localStorage.set(token, data.token)
                })
                .catch(e => {

                })
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
        background: url('../../assets/whirlpool.png'), #1E8BC3;
    }
        #login__box {
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: -150px;
            margin-left: -150px;
            width: 300px;
            height: 230px;
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
                color: #000;
                position: absolute;
                top: 0px;
                left: 0px;
                width: 25%;
                padding: 20px;
                font-weight: 200;
                box-sizing: border-box;
                border-top-left-radius: 3px;
                background-color: #EEE;
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
            .submit__button {
                font-family: Montserrat;
                font-size: 13px;
                letter-spacing: 1px;
                text-align: left;
                background-color: #4B77BE;
                border: 0;
                color: #FFF;
                padding: 10px 20px;
                margin-top: 20px;
                border-radius: 5px;
                cursor: pointer;
                outline: none;
            }
</style>
