<template>
  <div class="home">
    <hr>
    <h1>Home</h1>
    <hr>
    <h3>Features:</h3>
    <p>
      Calculator -- calculate the costs/fee totals for your routes<br>
      Destinations List -- keep track of your destinations<br>
      GPS -- see your routes <br>
      Truck List -- keep track of your trucks<br>
      Truck Details -- see the details of each of your trucks<br>
      Route Details -- see the details of the routes for each of your trucks<br>
      Rules/Regulations List -- see what laws/guidlines are required for each of your trucks
    </p>
  </div>
</template>

<script>
export default {
  name: 'Home',
  props: {
    msg: String
  }
}
</script>