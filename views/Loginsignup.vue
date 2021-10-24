<template>
  <div class="loginsignup">
    <hr>
    <h1>Log in/Sign up</h1>
    <hr>
    <h3>Log in:</h3>
    <form>
      <label>Username: </label>
      <input type="username" required>
    </form>
    <form>
      <label>Password: </label>
      <input type="password" required>
    </form>
    <button>Log in</button>
    <h3>Sign up:</h3>
    <form>
      <label>Username: </label>
      <input type="username2" required>
    </form>
    <form>
      <label>Password: </label>
      <input type="password2" required>
    </form>
    <button>Sign up</button>
  </div>
</template>

<script>
export default {
  name: 'Loginsignup',
  props: {
    msg: String
  }
}
</script>