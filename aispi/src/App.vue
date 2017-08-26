<template>
  <div id="app">
    <router-view></router-view>
  </div>

</template>

<script>
  export default {
    name: 'app'
  }
  var el = document.createElement('script')
  el.setAttribute('type', 'text/javascript')
  el.setAttribute('src', 'https://www.google.com/recaptcha/api.js')
  document.getElementsByTagName('head')[0].appendChild(el)
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat:200,400');

#app {
  font-family: 'Avenir', Montserrat, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
