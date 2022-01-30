<template>
  <div class="trucklist">
    <hr>
    <h1>Truck List</h1>
    <hr>
    <h3>License Plate, Type, Status</h3>
    <form>
      <label>License Plate, Type, Status: </label>
      <input type="platetypestatus" required>
      <button>Add</button>
      <button>Delete</button>
    </form>
    
  </div>
</template>

<script>
export default {
  name: 'Trucklist',
  props: {
    msg: String
  }
}
</script>