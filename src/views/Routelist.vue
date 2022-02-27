<template>
  <div class="routelist">
    <hr>
    <h1>Route List</h1>
    <hr>
    <h3>Truck, Destination, Status</h3>
    <form>
      <label>Truck, Destination, Status: </label>
      <input type="truckdestinationstatus" required>
      <button>Add</button>
      <button>Delete</button>
    </form>
    
  </div>
</template>

<script>
export default {
  name: 'Routelist',
  props: {
    msg: String
  }
}
</script>