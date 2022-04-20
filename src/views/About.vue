<template>
  <div class="about">
    <hr>
    <h1>About</h1>
    <hr>
    <div>
      <h3>Our Team:</h3>
      <p>
        Brandon Carter<br>
        Cody Haigler<br>
        Evan Kitten<br>
        Liam Olson<br>
        Brandon Torres <a href="https://www.linkedin.com/in/brandon-torres-01bb7b228/">LinkedIn</a>
      </p>
      <h3>Our Github Repo:</h3>
      <a href="https://github.com/SCCapstone/TheB-Team">Github</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutView',
  props: {
    msg: String
  }
}
</script>