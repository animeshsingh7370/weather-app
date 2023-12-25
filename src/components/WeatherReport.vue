<template>
  <Toggle class="temp-toggle" v-model="isF" on-label="°C" off-label="°F" />

  <div class="weather-container">
    <h1 id="date">{{ currentDate }}</h1>
    <span id="weather-location">{{ locationName }}</span>
    <h1 id="temperature">
      {{ temperature }}<sub> | </sub><sub>{{ condition }}</sub>
    </h1>
    <div class="additional-info">
      <p>
        <span id="feelsLikeTemp">{{ feelsLike }}</span>
        <br />
        <span class="feelsLikeText">Feels Like</span>
      </p>

      <p>
        <span id="humidity">{{ humidity }}</span>
        <br />
        <span class="humidityText">Humidity</span>
      </p>

      <p>
        <span id="pressure">{{ pressure }}</span>
        <br />
        <span class="pressureText">Pressure</span>
      </p>

      <p>
        <span id="windSpeed">{{ windSpeed }}</span>
        <br />
        <span class="wind-speed-text">Wind Speed</span>
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Toggle from "@vueform/toggle";
export default {
  components: {
    Toggle,
  },
  data() {
    return {
      responseData: null,

      locationName: "",
      currentDate: "",
      temperature: "",
      condition: "",
      srcCondition: "",
      feelsLike: "",
      humidity: "",
      pressure: "",
      windSpeed: "",
      isF: false,
    };
  },

  created() {
    if (this.$route.query.locationName) {
      this.locationName = this.$route.query.locationName;
      console.log(this.locationName);

      axios
        .post("/api/sendData", { location: this.locationName })
        .then((response) => {
          this.responseData = response.data;
          // Handle the response from the Go backend
          this.currentDate = response.data.date;
          var cityName = response.data.location.name;
          // var regionName = response.data.location.region;
          var countryName = response.data.location.country;
          this.locationName = `${cityName},  ${countryName}\n`;
          this.temperature = `${response.data.current.temp_c} °C`;
          this.condition = response.data.current.condition.text;
          this.feelsLike = `${response.data.current.feelslike_c} °C`;
          this.humidity = `${response.data.current.humidity} %`;
          this.pressure = `${response.data.current.pressure_mb} mb`;
          this.windSpeed = `${response.data.current.wind_kph} km/h`;
        });
    }
  },
  watch: {
    isF() {
      if (this.isF) {
        console.log("nothing");
        this.temperature = `${this.responseData.current.temp_f} °F`;
        this.feelsLike = `${this.responseData.current.feelslike_f} °F`;
      } else {
        this.temperature = `${this.responseData.current.temp_c} °C`;
        this.feelsLike = `${this.responseData.current.feelslike_c} °C`;
      }
    },
  },
};
</script>
<style src="@vueform/toggle/themes/default.css"></style>
