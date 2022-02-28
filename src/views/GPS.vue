<template>  
  <div>
    <hr>
    <h1>GPS</h1>
    <hr>
    <p>Enter a latitude followed by a longitude for both points and click submit (No route will be displayed if a route for your coordinates does not exist)</p>
    <p>An example of a set of valid coordinates is: 33.520217,-80.672052 and 35.725890, -78.589105</p>
    <h4>Point A</h4>
    <input type="number" v-model="lat1" placeholder="Lat1">
    <input type="number" v-model="lng1" placeholder="Lng1">
    <h4>Point B</h4>
    <input type="number" v-model="lat2" placeholder="Lat2">
    <input type="number" v-model="lng2" placeholder="Lng2">
    <button @click="generateMap(lat1,lng1,lat2,lng2); showDiv();">Submit</button>
  </div>
  <div id="mapContainer" style="height:600px;width:100%" ref="hereMap"></div>
  <div id="displayDiv" style="display:none;"> 
    <h2>Miles and times followed by their respective states</h2>
    <div v-for="(route,index) in routes" v-html="route.text" :key="index"></div>
    <button @click="sendRoutes()">Send Routes</button>
  </div>
</template>

<script>
import { getRoute } from '@/utils.js';
 export default {
    name: 'gpsView',
    data() {
      return {
        routes: [],
        points: [],
        lat1: 0,
        lng1: 0,
        lat2: 0,
        lng2: 0,
        isMap: false
      }
    },
    methods: {
      //METHOD: generate a map using the Here mapping api and routing api to populate map with a route
      async generateMap(lat1,lng1,lat2,lng2) {
        this.resetMap("mapContainer");
        this.isMap = true;
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
        var response = await getRoute(lat1,lng1,lat2,lng2);
        this.routes = response.data.response.route[0].summaryByCountry;
        this.routes.forEach((route) => {
            route.text += route.country
        });
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
      resetMap(elementID) {
        if (this.isMap == true) {
          document.getElementById(elementID). innerHTML = "";
        }
      },
      showDiv() {
        document.getElementById("displayDiv").style.display = "";
      },
      sendRoutes() {
        this.$emit('submitRoutes', this.routes)
      }
    },
    mounted() {
    }
  }
  </script>