<template>  
  <div>
    <hr>
    <h1>GPS</h1>
    <hr>
    <p>Enter a street, city, and state for both Point A and Point B (Note: No route will be displayed if a route for your coordinates does not exist)</p>
    <h4>Point A</h4>
    <input type="text" v-model="street1" placeholder="Street">
    <input type="text" v-model="city1" placeholder="City">
    <input type="text" v-model="state1" placeholder="State">
    <h4>Point B</h4>
    <input type="text" v-model="street2" placeholder="Street">
    <input type="text" v-model="city2" placeholder="City">
    <input type="text" v-model="state2" placeholder="State">
    <button @click="generateMap(street1, street2, city1, city2, state1, state2); showDiv(); showDirections();">Submit</button>
  </div>
  <div id="mapContainer" style="height:600px;width:100%" ref="hereMap"></div>
  <div class="display" id="displayDiv" style="display:none;"> 
    <h2>Miles and times followed by their respective states</h2>
    <div v-for="(route,index) in routes" v-html="route.text" :key="index"></div>
  </div>
  <div id="directionsDiv" style="display:none;">
    <h3>Directions</h3>
    <div v-for="(maneuver,index) in directions" v-html="maneuver.instruction" :key="index"></div>
  </div>
  <div id="printButton" style="display:none;">
    <button @click="printDiv('directionsDiv');">Print Directions</button>
  </div>
</template>

<script>
import { getRoute } from '@/utils.js';
import { getCoord } from '@/utils.js';
 export default {
    name: 'gpsView',
    data() {
      return {
        routes: [],
        points: [],
        directions: [],
        street1: "",
        street2: "",
        city1: "",
        city2: "",
        state1: "",
        state2: "",
        lat1: 0,
        lng1: 0,
        lat2: 0,
        lng2: 0,
        isMap: false,
        show: false,
        w: null
      }
    },
    methods: {
      //METHOD: generate a map using the Here mapping api and routing api to populate map with a route
      async generateMap(street1, street2, city1, city2, state1, state2) {
        var response1 = await getCoord(street1,city1,state1);
        var response2 = await getCoord(street2,city2,state2);

        if(response1.data.Response.View[0] != undefined && response2.data.Response.View[0] != undefined) {
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
          });
          // add behavior control
          new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
          // add UI
          H.ui.UI.createDefault(map, maptypes);
          // End rendering the initial map
          //THIS IS FOR THE ROUTING API & GEOCODING API
          this.lat1 = response1.data.Response.View[0].Result[0].Location.DisplayPosition.Latitude
          this.lng1 = response1.data.Response.View[0].Result[0].Location.DisplayPosition.Longitude
          this.lat2 = response2.data.Response.View[0].Result[0].Location.DisplayPosition.Latitude
          this.lng2 = response2.data.Response.View[0].Result[0].Location.DisplayPosition.Longitude
          var response3 = await getRoute(this.lat1,this.lng1,this.lat2,this.lng2);
          this.routes = response3.data.response.route[0].summaryByCountry
          this.directions = response3.data.response.route[0].leg[0].maneuver
          this.routes.forEach((route) => {
              route.text += route.country
          });
          this.points = response3.data.response.route[0].shape;
          var linestring = new H.geo.LineString();
          this.points.forEach(function(point){
              let [lat, lng] = point.split(",");
              linestring.pushPoint({ lat: lat, lng:lng});
          });
          var polyline = new H.map.Polyline(linestring, { style: { lineWidth: 5 }});
          
          map.addObject(polyline);
          map.getViewModel().setLookAtData({bounds: polyline.getBoundingBox()});
        }
        else {
          document.getElementById('mapContainer').innerHTML="NO ROUTE EXISTS";
          this.isMap = true;
          document.getElementById("displayDiv").style.display = "none";
          document.getElementById("directionsDiv").style.display = "none";
          document.getElementById("printButton").style.display = "none";
        }
      },
      resetMap(elementID) {
        if (this.isMap == true) {
          document.getElementById(elementID).innerHTML = "";
        }
      },
      showDiv() {
        document.getElementById("displayDiv").style.display = "";
      },
      showDirections() {
        document.getElementById("directionsDiv").style.display = "";
        document.getElementById("printButton").style.display = "";
      },
      sendRoutes() {
        this.$emit('submitRoutes', this.routes)
      },
      //used to print out directions
      printDiv(divName) {
        if(document.getElementById(divName) != null) {
          var printContents = document.getElementById(divName).innerHTML;
        }
        this.w=window.open();
        this.w.document.write(printContents);
        this.w.print();
        this.w.close();
      }
    },
    mounted() {
    }
  }
  </script>
  <style scoped>
  h4{
    color: #4CAF50;
  }
  h2,h3{
    text-shadow: 1px 1px 1px #4CAF50,
                 2px 2px 1px #4CAF50;
  }
  input{
    width: 20%;
  }
  </style>