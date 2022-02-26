<template>
  <div class="home">
    <hr>
    <h1>Home</h1>
    <hr>
    <div align="center">
    <h3>Features:</h3>
    <p>
      GPS -- see your routes <br>
      Calculator -- calculate the costs/fee totals for your routes<br>
      Rules/Regulations List -- see what laws/guidlines are required for each of your trucks
    </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  props: {
    msg: String
  }
}
</script>