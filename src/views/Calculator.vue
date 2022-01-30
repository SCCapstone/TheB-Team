<template>
  <div class="calculator">
    <hr>
    <h1>Calculator</h1>
    <hr>
    <h3>Type your:</h3>
    <form>
      <label>State Initials: </label>
      <input type="state" required>
    </form>
    <form>
      <label>Length: </label>
      <input type="length" required>
    </form>
    <form>
      <label>Width: </label>
      <input type="width" required>
    </form>
    <form>
      <label>Height: </label>
      <input type="height" required>
    </form>
    <button>Calculate</button>
    <h3>Costs:</h3>
    <p>
        State Permit Is:<br>
        State Other Permits Are:<br>
        Escort Cost Is:<br>
        Escort Miles Cost Is:<br>
        Pole Escort Cost Is:<br>
        Pole Escort Miles Cost Is:<br>
        Overnight Fee Is:<br>
        Police Escort Cost Is:<br>
        Police Escort Miles Cost Is:<br>
        Police Escort Hourly Cost Is:<br>
        Survey Cost Is:<br>
        Survey Miles Cost Is:<br>
        Enginerring Cost Is:<br>
        Utility Cost Is:<br>
        Total Is:
    </p>
  </div>
</template>

<script>
export default {
  name: 'Calculator',
  props: {
    msg: String
  }
}
</script>