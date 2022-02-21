<template>
  <div id="map" />
</template>

<script>
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'
import { onMounted } from "vue";
export default {
  setup() {
    onMounted(() => {
      mapboxgl.accessToken =
        "pk.eyJ1IjoiYmNhcnRlcjk4IiwiYSI6ImNrdmxmM2lyaDM1YW8ybnFpd25pMXAweWkifQ.d9dq5Fh0ykTmsJmCmEKrAA";
      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-96, 37.],
        zoom:3
      });
  map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
        },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true
        }),
      );
  map.addControl(
        new MapboxDirections({
          accessToken: mapboxgl.accessToken,
        }),
        'top-left'
      )    
    });
    return {};
  },
};
</script>

<style>
#map {
  height: 100vh;
}
</style>