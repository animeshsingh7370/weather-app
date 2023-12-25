<template>
  <div id="app">
    <router-link to="/"></router-link>
    <router-link to="/weatherdetails"></router-link>

    <router-view></router-view>
  <!-- <HomePage/> -->
  <!-- <WeatherReport/> -->
  </div>

</template>


<script>
// import HomePage from './components/HomePage.vue'
// import WeatherReport from './components/WeatherReport.vue'

export default {
  name: 'App',
    components: {
    // HomePage,
    // WeatherReport
  }
}
</script>

<style>
@import "@/assets/styles.css";

</style>
