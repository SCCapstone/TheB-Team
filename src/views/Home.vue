<template>
  <div class="home">
    <hr>
    <h1 class="text-ceter">Welcome</h1>
    <hr>
    <h3 class="text-ceter">Features:</h3>
    <p class="text-ceter">
      GPS -- see your routes <br>
      Calculator -- calculate the costs/fee totals for your routes<br>
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