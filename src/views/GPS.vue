<template>
  <div>
    <input type="number" v-model="lat1" placeholder="Lat1">
    <input type="number" v-model="lng1" placeholder="Lng1*">
    <input type="number" v-model="lat2" placeholder="Lat2*">
    <input type="number" v-model="lng2" placeholder="Lng2*">
    <button @click="generateMap(lat1,lng1,lat2,lng2)">Submit</button>
    <button @click="resetMap">Reset Map</button>
  </div>
  <div id="mapContainer" style="height:600px;width:100%" ref="hereMap"></div>
  <h2>Miles and times followed by their respective states</h2>
  <div v-for="(route,index) in routes" v-html="route.text" :key="index"></div>
</template>

<script>
  

  export default {
    name: 'gps',
    components: {
    },
    data() {
      return {
        routes: [],
        points: [],
        geoStr: 'geo!',
        lat1: 0,
        lng1: 0,
        lat2: 0,
        lng2: 0
      }
    },
    methods: {
      //METHOD: call the routing api to get the state mileage
      async getRoute(lat1,lng1,lat2,lng2) {
        var geoStr = this.geoStr;
        var response = await this.axios.get("https://route.ls.hereapi.com/routing/7.2/calculateroute.json", {
          params: {
            apiKey:"x3u91OpwIPzEJL_v89yy8xy7V1tZxjdB83oA7b3PL70",
            waypoint0:`${geoStr}${lat1},${lng1}`,
            waypoint1:`${geoStr}${lat2},${lng2}`, 
            routeattributes:"wp,sm,sh,sc",
            mode:"fastest;truck",
            metricSystem: "imperial"
          }});
          this.routes = response.data.response.route[0].summaryByCountry;
          this.routes.forEach((route) => {
              route.text += route.country
          });
          console.log(this.routes)

      },
      
      //METHOD: generate a map using the Here mapping api and routing api to populate map with a route
      async generateMap(lat1,lng1,lat2,lng2) {
        var geoStr = this.geoStr;
        const mapContainer = this.$refs.hereMap;
        const H = window.H;
        const platform = new window.H.service.Platform({
          apikey: "x3u91OpwIPzEJL_v89yy8xy7V1tZxjdB83oA7b3PL70"
        });
        this.platform = platform;
        this.routingService = this.platform.getRoutingService();

        //THIS IS FOR THE MAP
        // Obtain the default map types from the platform object
        var maptypes = this.platform.createDefaultLayers();
        // Instantiate (and display) a map object:
        const map = new H.Map(mapContainer, maptypes.vector.normal.map, {
            zoom: 10,
            center: { lat: lat1, lng: lng1 }
        });
        // add behavior control
        new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
        // add UI
        H.ui.UI.createDefault(map, maptypes);
        // End rendering the initial map

        //THIS IS FOR THE ROUTING API
        var response = await this.axios.get("https://route.ls.hereapi.com/routing/7.2/calculateroute.json", {
          params: {
            apiKey:"x3u91OpwIPzEJL_v89yy8xy7V1tZxjdB83oA7b3PL70",
            waypoint0:`${geoStr}${lat1},${lng1}`,
            waypoint1:`${geoStr}${lat2},${lng2}`, 
            routeattributes:"wp,sm,sh,sc",
            mode:"fastest;truck",
            metricSystem: "imperial"
        }});
        this.getRoute(lat1,lng1,lat2,lng2);
        this.points = response.data.response.route[0].shape;

        var linestring = new H.geo.LineString();
        this.points.forEach(function(point){
            let [lat, lng] = point.split(",");
            linestring.pushPoint({ lat: lat, lng:lng});
        });
        var polyline = new H.map.Polyline(linestring, { style: { lineWidth: 5 }});
        
        map.addObject(polyline);

        map.getViewModel().setLookAtData({bounds: polyline.getBoundingBox()});
      },

      resetMap() {
        window.location.reload(false);
      }
    },
    mounted() {

    }
  }

</script>