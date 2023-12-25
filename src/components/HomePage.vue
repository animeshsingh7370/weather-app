<template>
    <div class="container">
      <h1 class="title">Weather App</h1>
     
      <img class="app-image" src="@/assets/rainy-day.png" alt="rainy-day" />

      <div class="input-group">
        <input
          type="text"
          id="city"
          placeholder="Enter City Name"
          v-model="inputValue"/>
        
        <button  @click="getLocation()">
          <img src="@/assets/location.png" alt="Location Icon" />
        </button>
      </div>
      <button type="button" @click="getWeatherReport()">
        Get Weather Report
      </button>
      <h3 id="weatherData"></h3>
    </div>
</template>

<script>
import axios from "axios";
export default {
  data() {


    return {
      inputValue: "",
     
      
    };
  },
  methods: {
    getWeatherReport() {
      var cityName = this.inputValue;
      if (cityName == "") {
        alert("Please enter a city name");
        return;
      }

      var locationData = {
        location: cityName,
      };

      this.$router.push({
        path: "/weatherdetails",
        query: { locationName: locationData.location },
      });
    },

    getLocation() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          var latitude = position.coords.latitude.toString();
          var longitude = position.coords.longitude.toString();

          var data = {
            latitude: latitude,
            longitude: longitude,
          };

          axios
            .post("/api/sendData", data)
            .then((response) => {
              

              var cityName = response.data.location.name;

              this.inputValue = cityName;
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        });
      } else {
        console.log("Geolocation is not supported by your browser.");
      }
    },


  },
    beforeRouteLeave(to, from, next) {
    if (this.inputValue == "") {
      next(false);
    } else {
      next();
    }
    
  },
};
</script>
