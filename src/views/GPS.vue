<template>
  <div id="map">
    <hr>
    <h1>GPS</h1>
    <hr>
    <HereMap
      ref="map"
      apiKey="uxi-Q8ksdpRfsMe14Z8qrY7_XxlU3BdP9nz9en8KQ18"
      latitude="37"
      longitude="-121"
      zoom="10"
    />
  </div>
  <h2>Miles and times followed by their respective states</h2>
  <div v-for="(route,index) in routes" v-html="route.text" :key="index"></div>
</template>

<script>
  import HereMap from '../hereMap.vue'
  

  export default {
    name: 'gpsView',
    components: {
      HereMap
    },
    data() {
      return {
        routes: []
      }
    },
    methods: {
      async getRoute() {
        var response = await this.axios.get("https://route.ls.hereapi.com/routing/7.2/calculateroute.json", {
          params: {
            apiKey:"uxi-Q8ksdpRfsMe14Z8qrY7_XxlU3BdP9nz9en8KQ18",
            waypoint0:"geo!33.520217,-80.672052",
            waypoint1:"geo!35.725890,-78.589105", 
            routeattributes:"wp,sm,sh,sc",
            mode:"fastest;truck",
            metricSystem: "imperial"
          }});
          this.routes = response.data.response.route[0].summaryByCountry;
          this.routes.forEach((route) => {
            route.text += route.country
          });
          console.log(this.routes)
      }
    },
    mounted() {
      // let map = this.$refs.map;
      // map.drawRoute(
      //   {lat: "37",lng: "-121"},{lat: "38",lng: "-122"}
      // )
      this.getRoute();
    }
  }

</script>