<template>
  <div id="app">
    <router-view></router-view>
    <popUp state="state" v-bind:state="bookedEvent"></popUp>
  </div>
</template>

<script>
  import PopUp from '@/components/PopUp'
  export default {
    name: 'app'
  }
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
