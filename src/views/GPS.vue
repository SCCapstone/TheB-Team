<template>
  <div id="mapContainer" class="basemap"></div>
</template>

<script>
import mapboxgl from "mapbox-gl";

export default {
  name: "BaseMap",
  data() {
    return {
      accessToken: 'pk.eyJ1IjoiYmNhcnRlcjk4IiwiYSI6ImNrdmxmM2lyaDM1YW8ybnFpd25pMXAweWkifQ.d9dq5Fh0ykTmsJmCmEKrAA',
    };
  },
  mounted() {
    mapboxgl.accessToken = this.accessToken;

    new mapboxgl.Map({
      container: "mapContainer",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [103.811279, 1.345399],
      zoom: 12,
    });
  },
};
</script>
<style lang="scss" scoped>
.basemap {
  width: 100%;
  height: 100%;
}
</style>
